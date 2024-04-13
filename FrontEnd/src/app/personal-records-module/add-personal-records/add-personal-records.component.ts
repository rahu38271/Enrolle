import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-personal-records',
  templateUrl: './add-personal-records.component.html',
  styleUrls: ['./add-personal-records.component.scss'],
})
export class AddPersonalRecordsComponent implements OnInit {

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
