import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent implements OnInit {
  
  public isLoading = false;
  hasErrors = false;
  ContactForm: FormGroup;
  responseSent: string;
  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

   constructor(private fb: FormBuilder, private httpClient:HttpClient) {
    this.createForm();
    this.responseSent = '';
  }

  SendMail(): void{
    this.isLoading = true;
    console.log(this.ContactForm.value.EmailFrom );
    this.ContactForm.value.EmailTo = "medicalCare";
    var dataObject = this.ContactForm.value;
    this.httpClient.post("http://localhost:62604/api/email/",
        dataObject,)
        .subscribe(
          (data:any) => {
            this.isLoading = false;
            this.responseSent = "Email sent successfully !!! , we will contact you shortly ";
              console.log("POST Request is successful ", data);
              this.ContactForm.reset();
          },
          error => {
            this.hasErrors = true;
            this.isLoading = false;
            this.responseSent = "Sorry your message was not sent !!!,  Please try again later  ";
              console.log("Error", error);
          }
      );           
  }

  createForm() {
    this.ContactForm = this.fb.group({
        FullName: ['', Validators.required ],
        EmailFrom: ['', Validators.required ],
        Subject: ['', Validators.required ],
        Message: ['', Validators.required ],
    });
  }

  ngOnInit(): void {
    
  }

}

