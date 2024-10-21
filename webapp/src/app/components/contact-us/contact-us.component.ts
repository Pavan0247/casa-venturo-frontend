// contact-us.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(private formBuilder: FormBuilder, private contact: ContactService, private snackbar: MatSnackBar) { }

  public contactForm!: FormGroup;

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    })
  }

  submit() {
    this.contact.sendContact(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.message).subscribe({
      next: (v) => { this.snackbar.open('We have recieved you message', 'Close') },
      error: (e) => {
        console.log(e); this.snackbar.open('Please try again', 'Close') },
      complete: () => { this.contactForm.reset() }
    })
  }
}
