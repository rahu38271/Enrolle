import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-other-directory',
  templateUrl: './add-other-directory.component.html',
  styleUrls: ['./add-other-directory.component.scss'],
})
export class AddOtherDirectoryComponent implements OnInit {

  myForm;
 
  mobile = '';
  office = '';
  name = '';
  home = '';
  email = '';
  floor = '';
  desk = '';
  assistant = '';
  Wmobile = '';
  designation = '';
  village = '';
  work = '';
  date = '';

  year : number = new Date().getFullYear();

  designationHeader: any = {
    header: 'Select Designation'
  }

  VilllageHeader: any = {
    header: 'Select Village'
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

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
