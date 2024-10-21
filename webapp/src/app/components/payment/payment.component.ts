import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { UserDataService } from 'src/app/services/user-data.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  public paymentForm!: FormGroup;

  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    console;

    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [
        localStorage.getItem('email'),
        [Validators.required, Validators.email],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });

    this.data.getUserData(localStorage.getItem('email'), headers).subscribe({
      next: (v) => {
        this.paymentForm = this.formBuilder.group({
          name: [localStorage.getItem('username'), [Validators.required]],
          email: [
            localStorage.getItem('email'),
            [Validators.required, Validators.email],
          ],
          phone: [
            v.phoneNumber,
            [Validators.required, Validators.pattern(/^[0-9]*$/)],
          ],
          amount: [
            localStorage.getItem('price'),
            [Validators.required, Validators.pattern(/^[0-9]*$/)],
          ],
        });
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  title = 'Casa Ventura';

  constructor(
    private orderService: OrderServiceService,
    private formBuilder: FormBuilder,
    private data: UserDataService,
    private router: Router
  ) {}

  onCancel() {
    console.log('Payment Cancelled');
  }

  sayHello() {
    alert('Hello CV');
  }

  paymentId!: string;
  error!: string;

  options = {
    key: '',
    amount: '',
    name: 'CasaVentura',
    description: 'CGI Capstone',
    //TODO
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      // TODO
      color: '#B5C99A',
    },
  };

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';

    // Check if the amount is valid (greater than or equal to 0)
    if (this.paymentForm.value.amount < 0) {
      this.error = 'Amount cannot be negative.';
      return; // Exit the function if the amount is not valid
    }

    this.orderService.createOrder(this.paymentForm.value).subscribe(
      (data: {
        secretId: string;
        razorpayOrderId: string;
        applicationFee: string;
        pgName: string;
      }) => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = 'Casa Ventura';
        this.options.prefill.email = 'casaventura.demo@demo.com';
        this.options.prefill.contact = '9876543210';

        if (data.pgName === 'razor2') {
          this.options.image = '';
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }

        rzp1.on(
          'payment.failed',
          (response: {
            error: {
              code: any;
              description: any;
              source: any;
              step: any;
              reason: string;
              metadata: { order_id: any; payment_id: any };
            };
          }) => {
            // TODO - store this information in the server
            console.log(response);
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            this.error = response.error.reason;
          }
        );
      },
      (err: { error: { message: string } }) => {
        this.error = err.error.message;
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any }): void {
    console.log(event.detail);
  }
}
