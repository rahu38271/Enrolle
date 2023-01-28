import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService} from 'src/app/services/authentication.service'
import {IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  myForm;
 
  Password:any;
  confirmPassword:any;
  isPasswordNotMatched:any=false;

  ismyTextFieldType: boolean;
  id:number;
  loginId: any;
  password() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  ismyTextFieldType1: boolean;
  confPassword() {
    this.ismyTextFieldType1 = !this.ismyTextFieldType1;
  }

  constructor
    (
      private auth:AuthenticationService,
      private toast:IonicToastService
    ) 
    { }

  checkPassword(){
    this.isPasswordNotMatched = this.Password != this.confirmPassword;
  }


  ngOnInit() {
    this.loginId = localStorage.getItem("loginId");
  }

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    f.resetForm();
  }

  savePassword(){
    if(this.isPasswordNotMatched){
      this.toast.presentToast("Password not matched with confirm password", "danger", 'alert-circle-sharp');
      return;
    }
    this.auth.changePassword(parseInt(this.loginId),this.Password).subscribe((data)=>{
      this.toast.presentToast("Password changed successfully!", "success", 'checkmark-circle-sharp');
    },(err)=>{
      this.toast.presentToast("Password not changed", "danger", 'alert-circle-sharp');
    })
  }


}
