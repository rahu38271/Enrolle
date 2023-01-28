import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  myForm;
  date;
  date1;
  event;
  eventModel: any = {};

  year : number = new Date().getFullYear();

  // onSubmit(){
  //   if(this.progModel.invalid){
  //     return;
  //   }
  // }

  onSubmit(eventForm: NgForm) {
    if(this.eventModel.invalid){
          return;
     }
     eventForm.resetForm();
}
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

 
}
