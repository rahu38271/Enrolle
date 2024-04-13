import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-officer',
  templateUrl: './edit-officer.component.html',
  styleUrls: ['./edit-officer.component.scss'],
})
export class EditOfficerComponent implements OnInit {

  designationHeader:any = {
    header: 'पदनाम'
  };
  departmentHeader:any = {
    header: 'विभाग'
  };

  myForm;
 
  mobile = '';
  office = '';
  name = '';
  home = '';
  email = '';
  floor = '';
  desk = '';
  assistant = '';
  Amobile = '';
  designation = '';
  department = '';
  work = '';

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

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
