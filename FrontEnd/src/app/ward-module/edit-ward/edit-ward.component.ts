import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-ward',
  templateUrl: './edit-ward.component.html',
  styleUrls: ['./edit-ward.component.css']
})
export class EditWardComponent implements OnInit {

  userModel: any = {};
  myForm;
  Quote;
  Ward = '';
  WardNumber = '';
  boothName = '';
  boothNumber = '';
  
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

  constructor(public loadingController: LoadingController) { }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Adding User...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.userModel.invalid){
      return;
    }else{

    }
    f.resetForm();
  }

}
