import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/UserService/user.service';
import { ModalService } from '../user/shared/CustomModalService/modal.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Doctor } from '../user/shared/Models/doctor';
import { timeSlot } from '../user/shared/Models/timeSlot';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from '../user/shared/appointmentService/appointment.service';
import { appointmentRequestModel } from '../user/shared/Models/appointmentRequestModel';


export function validateAppointmentDate(appointmentDate: AbstractControl) : {[key: string] :any} {
  const minDate = new Date();
  const maxDate = new Date(new Date().getTime()+(14*24*60*60*1000)); 

  if(appointmentDate.value > minDate && appointmentDate.value < maxDate)
  {
    return null;
  }else{
    return {'appointDate': true}
  }
}

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit { 

  bodyText: string;
  userClaims: any;
  appointmentBookingForm: FormGroup;
  doctorsList: Doctor[];
  timeSlots: timeSlot[];
  isLoading: boolean;
  newApp: boolean;
  hasErrors:boolean;
  responseSent:string;
  minDate:Date;
  maxDate:Date;


  constructor(private router: Router, private userService: UserService, private modalService: ModalService, private fb: FormBuilder,private appointmentService:AppointmentService, private httpClient:HttpClient) 
  {

    this.ResetAppointmentFormBooking();
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime()+(14*24*60*60*1000));  
    this.doctorsList = [new Doctor(0,"Any"), new Doctor(1,"Dr Kunle"),new Doctor(2,"Dr Gomba"),new Doctor(3,"Mr Gee")]
    this.timeSlots = [new timeSlot(1,"08:00"),new timeSlot(2,"08:45"),new timeSlot(3,"09:00"),new timeSlot(4,"09:45")];
  }



  ngOnInit() {
    this.isLoading = false;
    this.newApp = false;
    this.responseSent = '';
    this.userService.getUserClaims().subscribe((data: any)=> {
      this.userClaims = data;
    });
    console.log('Data has : '+this.userClaims);

    this.appointmentBookingForm = new FormGroup(
      {
        appointmentDate: new FormControl(),
        preferredTimeSlot: new FormControl(),
        preferredDoctor: new FormControl()
      }
    );
  }

  onSubmit():void{    
    console.log("Show spinner : "+this.isLoading);
    console.log(this.appointmentBookingForm.value);
    this.RequestAppointment();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.isLoading= false;
      this.modalService.close(id);
  }

  ResetAppointmentFormBooking()
  {
    this.responseSent = '';
    this.appointmentBookingForm = this.fb.group({
      appointmentDate: ['', [Validators.required]],
      preferredDoctor: ['', Validators.required ],
      preferredTimeSlot: ['', Validators.required ],
    });
  }

  RequestAppointment(){
    this.isLoading= true;
    this.newApp = true;
    console.log('Data being sent :'+this.appointmentBookingForm.value.EmailFrom );
    var appointmentDetails = new appointmentRequestModel(
                                                          this.userClaims.Email,
                                                          this.appointmentBookingForm.controls['preferredDoctor'].value, 
                                                          null,
                                                          this.appointmentBookingForm.controls['preferredTimeSlot'].value, 
                                                          this.appointmentBookingForm.controls['appointmentDate'].value,
                                                          this.userClaims.Email
                                                          ); 
    this.appointmentBookingForm.value;
    
    this.appointmentService.RequestAppointment(appointmentDetails).subscribe((data: any) => {
      if (data.Succeeded == true) {
        this.isLoading = false;
        this.ResetAppointmentFormBooking();
        this.responseSent = "... Appointment successfully Requested... ";
      }
      else{
        this.isLoading = false;
        this.hasErrors = true;
        this.responseSent = "Error appointment was not created !!!,  Please try again later  ";
      }
    });  
    console.log("Added : "+this.newApp );     
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/signup']);
  }

}
