import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss'],
})
export class EditRoutineComponent implements OnInit {

  myForm;
  program = '';
  type = '';
  place = '';
  address = '';
  radio = '';
  routineModel: any = {};

  progDate = ''
  year : number = new Date().getFullYear();

  typeHeader:any = {
    header: 'कार्यक्रमाचे स्वरूप'
  }

  placeHeader:any = {
    header: 'कार्यक्रमाचे ठिकाण'
  }

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
  

  constructor() {
    
   }

  ngOnInit() {
    
  }

  RoutineForm(){

  }

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(){
    
  }

}
