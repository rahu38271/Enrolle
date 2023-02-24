import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { OtpPage } from 'src/app/otp/otp.page';
import { LoaderService } from 'src/app/services/loader.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  generatedOtp:any;

  loginModal:any= {
    Username:'',
    Password:''
  };

  otpIsCheck:any = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  @ViewChild('f', {static: false}) f: NgForm;
  roleName: any;

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

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private toast: IonicToastService,
    private auth: AuthenticationService,
    public modalController: ModalController,
    private loader: LoaderService
  ) {

  }

  ngOnInit() {
    //this.login();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  login() {
    debugger;
    
    this.loader.showLoading();
    this.auth.loginAdmin(this.loginModal.Username, this.loginModal.Password).subscribe(data => {
      this.loader.hideLoader();
      if (typeof data ==="object") {
        // localStorage.setItem("loginUser", data.user.name);
        // localStorage.setItem("loginId", data.user.id);
        // localStorage.setItem("loginRole", data.user.roleId);
        
        
        localStorage.setItem("loginUser", data.user[0].name);
        localStorage.setItem("loginId", data.user[0].id);
        localStorage.setItem("userType", data.user[0].roleId);
        //this.auth.sendOtp(this.loginModal.Username).subscribe((data) => {
        //   this.otpverify(data);
        //});
          this.toast.presentToast("Logged In Succesfully", "success", 'checkmark-circle-outline');
          this.loader.hideLoader();
          //this.router.navigate(['/home/mobile-dashboard']);
          // if we use router.navigate to redirect to dashboard page we need to refresh to see menubar based on user role.
          location.href = "#/home/mobile-dashboard";
      }
    },
    (err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Invalid Username or Password!", "danger", 'alert-circle-sharp');
    }
    );
  }





  async otpverify(otp:any) {
    const modal = await this.modalController.create({
      component: OtpPage,
      componentProps: {
        'otp': otp,
      },
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
    });
    modal.onDidDismiss().then((modelData) => {
      this.loader.showLoading();
      if (modelData !== null) {
        if (modelData.data.status) {
          this.otpIsCheck = 1 // valid otp
          this.router.navigate(['/home/mobile-dashboard']);
          this.loader.hideLoader();
          this.toast.presentToast("Logged In Succesfully", "success", 'checkmark-circle-outline')
        }
        else {
          this.loader.hideLoader();
          this.toast.presentToast("Invalid OTP!", "danger", 'alert-circle-outline');
        }
      }

    });
    return await modal.present();
  }

  onSubmit() {
    
  }

}
 