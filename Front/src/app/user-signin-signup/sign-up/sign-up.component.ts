import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user/shared/Models/user.model';
import { UserService } from 'src/app/user/shared/UserService/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  NgRegForm: FormGroup;
  title: string = 'Login Form';
  genderType: { id: number, type: string }[]

  constructor(private userService: UserService, private toastr: ToastrService) 
  { }

  ngOnInit() {

    this.genderType = [
      { id:1, type:'Male' },
      { id:2, type:'Female' },      
    ];

    console.log(this.title);
    this.resetForm(this.NgRegForm);

    this.NgRegForm = new FormGroup({
      FirstName: new FormControl(null, Validators.required),
      LastName: new FormControl('', Validators.required), 
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Gender:new FormControl('', Validators.required),             
    });

    console.log(this.NgRegForm);
    
  }

  resetForm(NgRegForm: FormGroup) {
    if (NgRegForm != null)
      NgRegForm.reset();
    this.user = {
      Password: '',
      Email: '',
      Gender:'',
      FirstName: '',
      LastName: '',
      Username:''
    }
  }

  OnSubmit(NgRegForm: FormGroup) {
    this.userService.registerUser(NgRegForm.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(NgRegForm);
          this.toastr.success('User registration successful');
        }
        else{
          this.toastr.error(data.Errors[0]);
        }
      },(err : any)=>{
      this.toastr.error("Sorry could not connect to server.");
    });
  }

}
