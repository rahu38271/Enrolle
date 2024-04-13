import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-journalist',
  templateUrl: './add-journalist.component.html',
  styleUrls: ['./add-journalist.component.scss'],
})
export class AddJournalistComponent implements OnInit {

 year : number = new Date().getFullYear();

 BirthDate;

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

  myForm;
  
  subject = '';
  link = '';
  reporter = '';
  mobile = '';
  whatsapp = '';
  radio = '';
  mode= '';
  modeType ='';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }
}
