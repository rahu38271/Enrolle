import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-press-note',
  templateUrl: './add-press-note.component.html',
  styleUrls: ['./add-press-note.component.scss'],
})
export class AddPressNoteComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  
  subject = '';
  link = '';
  reporter = '';
  mobile = '';
  whatsapp = '';
  radio = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
