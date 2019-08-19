import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/shared/UserService/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  MedicalLoginForm: FormGroup;
  constructor(private userService : UserService,private router : Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.MedicalLoginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
   });
  }

  OnSubmit(userName,password){
      this.userService.userAuthentication({ userName, password }).subscribe((data : any)=>{
       if(data){
         localStorage.setItem('userToken',data.access_token);
         localStorage.setItem('userRoles',data.role);
         this.router.navigate(['/member']);
       }else{
        this.toastr.error("Sorry wrong credentials");
       }
        
     },
    (err : HttpErrorResponse)=>{
      this.toastr.error("Sorry wrong credentials");
      this.isLoginError = true;
    });
  }

}
