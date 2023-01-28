import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {

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
