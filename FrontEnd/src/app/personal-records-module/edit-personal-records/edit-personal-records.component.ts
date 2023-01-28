import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-personal-records',
  templateUrl: './edit-personal-records.component.html',
  styleUrls: ['./edit-personal-records.component.scss'],
})
export class EditPersonalRecordsComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  message = ''
  subject = '';
  
  date1 = '';
 
  priority = '';
  status = '';
  Date = '';
  ExpDate = '';
  compDate = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
