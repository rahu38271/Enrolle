import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {

  myForm;
  date;
  event;
  progModel: any = {};

  year : number = new Date().getFullYear();

  onSubmit(eventForm:NgForm){
    if(this.progModel.invalid){
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
