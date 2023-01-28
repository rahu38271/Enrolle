import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {


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

  myForm;

  constructor
    (
      public popoverController: PopoverController,
      public toastController: ToastController,
    ) {
      
  }





  ngOnInit() {

  }

  resetForm() {
    this.myForm.reset();
  }


}
