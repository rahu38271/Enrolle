import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-press-note',
  templateUrl: './edit-press-note.component.html',
  styleUrls: ['./edit-press-note.component.scss'],
})
export class EditPressNoteComponent implements OnInit {

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
