import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardserviceComponent } from './cardservice/cardservice.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './services/services.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserSigninSignupComponent } from './user-signin-signup/user-signin-signup.component';
import { SignInComponent } from './user-signin-signup/sign-in/sign-in.component';
import { SignUpComponent } from './user-signin-signup/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './user/shared/UserService/user.service';
import { MemberComponent } from './member/member.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    CardserviceComponent,
    NavbarComponent,
    CarouselComponent,
    HomeComponent,
    ServiceComponent,
    FooterComponent,
    AboutComponent,
    ContactusComponent,
    SpinnerComponent,
    UserSigninSignupComponent,
    SignInComponent,
    SignUpComponent,
    ForbiddenComponent,
    MemberComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule, 
    FormsModule, ReactiveFormsModule, ToastrModule.forRoot(),
    HttpClientModule,NgbModule,
    AppRoutingModule, AngularFontAwesomeModule,    
  ],
  providers: [
    UserService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
