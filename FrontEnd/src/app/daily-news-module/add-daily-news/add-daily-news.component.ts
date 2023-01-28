import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-daily-news',
  templateUrl: './add-daily-news.component.html',
  styleUrls: ['./add-daily-news.component.scss'],
})
export class AddDailyNewsComponent implements OnInit {

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
