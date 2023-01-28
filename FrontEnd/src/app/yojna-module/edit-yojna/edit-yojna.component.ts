import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-yojna',
  templateUrl: './edit-yojna.component.html',
  styleUrls: ['./edit-yojna.component.css']
})
export class EditYojnaComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  Yojna = '';
  Name = '';
  Date = '';
  Area = '';
  Occupation = '';
  Mobile = '';
  Wmobile = '';
  Status = '';
  NameBy = '';
  MobileBy = '';
  Gammount = '';

  constructor() { }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
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


  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
