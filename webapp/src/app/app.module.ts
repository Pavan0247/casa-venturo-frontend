import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

//login
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {HttpClientModule} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LandingVendorComponent } from './components/landing-vendor/landing-vendor.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { VendorCardComponent } from './components/vendor-card/vendor-card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { BookingComponent } from './components/booking/booking.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { MapComponent } from './components/map/map.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingActualVendorComponent } from './components/landing-actual-vendor/landing-actual-vendor.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { VendorBookingsComponent } from './components/vendor-bookings/vendor-bookings.component';
import { BookingCardUserComponent } from './components/booking-card-user/booking-card-user.component';
import { HomepageHeaderComponent } from './components/homepage-header/homepage-header.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PoliciesComponent } from './components/policies/policies.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { HeaderVendorComponent } from './components/header-vendor/header-vendor.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { ApiHealthComponent } from './components/api-health/api-health.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LandingVendorComponent,
    HeaderComponent,
    VendorCardComponent,
    BookingComponent,
    PaymentComponent,
    AdminViewComponent,
    MapComponent,
    FooterComponent,
    LandingActualVendorComponent,
    ContactUsComponent,
    AboutUsComponent,
    UpdateProfileComponent,
    HomepageComponent,
    UserBookingsComponent,
    BookingCardComponent,
    VendorRegisterComponent,
    ServiceCardComponent,
    VendorBookingsComponent,
    BookingCardUserComponent,
    HomepageHeaderComponent,
    PoliciesComponent,
    BackBtnComponent,
    ScrollUpComponent,
    HeaderVendorComponent,
    HeaderAdminComponent,
    CommonHeaderComponent,
    ApiHealthComponent,
    ForgotPasswordComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
