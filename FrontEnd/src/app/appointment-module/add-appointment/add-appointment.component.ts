import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {

  apmModal:any;

  year : number = new Date().getFullYear();

  myForm;
  status = '';
  subject = '';
  Edate = '';
  responsibility = '';
  priority = '';
  inpresence = '';
  place = '';
  date = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
