import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appointmentRequestModel } from '../Models/appointmentRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  readonly rootUrl = 'http://localhost:62889';

  constructor(private http: HttpClient) { }

  RequestAppointment(appointmentData : appointmentRequestModel){
    const body: any = {
        PatientEmailAddress: appointmentData.PatientEmailAddress ,
        PreferredDoctor: appointmentData.PreferredDoctor ,
        AppointedDoctor:  null,
        AppointmentTimeSlotId: appointmentData.AppointmentTimeSlotId,
        AppointmentDate: appointmentData.AppointmentDate,
        InitiatedBy: appointmentData.user
    }    
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer '+ localStorage.getItem('userToken')})
    let result = this.http.post(this.rootUrl + '/api/request/appointment', body, {headers : reqHeader});
    return result;
  }

  


}
