import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-officer',
  templateUrl: './add-officer.component.html',
  styleUrls: ['./add-officer.component.scss'],
})
export class AddOfficerComponent implements OnInit {

  designationHeader:any = {
    header: 'पदनाम'
  };
  DepartmentHeader:any = {
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
