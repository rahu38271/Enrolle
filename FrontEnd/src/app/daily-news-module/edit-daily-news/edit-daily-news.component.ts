import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-daily-news',
  templateUrl: './edit-daily-news.component.html',
  styleUrls: ['./edit-daily-news.component.scss'],
})
export class EditDailyNewsComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  
  subject = '';
  link = '';
  reporter = '';
  modeType = '';
  mode = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
