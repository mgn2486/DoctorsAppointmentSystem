export class appointmentRequestModel{
    constructor(
    public PatientEmailAddress: string,
    public PreferredDoctor: string,
    public AppointedDoctor: string,
    public AppointmentTimeSlotId: string, 
    public AppointmentDate: Date,
    public user:string)
    {}
}