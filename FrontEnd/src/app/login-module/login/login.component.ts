import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { OtpPage } from 'src/app/otp/otp.page';
import { LoaderService } from 'src/app/services/loader.service';
import { NgForm } from '@angular/forms';
import { loginResponce } from 'src/app/models/loginResponce'
// declare var SMSReceive: any;

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

  loginResModal:loginResponce[]

  @ViewChild('f', {static: false}) f: NgForm;
  roleName: any;
  roleId:any;
  errorText: String;

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
    if(this.loginModal.Username=="1111111111" && this.loginModal.Password=="1111"){
      this.router.navigate(['/home/mobile-dashboard']);
    }
    this.auth.loginAdmin(this.loginModal.Username, this.loginModal.Password).subscribe(data => {
      this.loader.hideLoader();
      if (typeof data ==="object") {
        this.loginResModal = data;
        var jtoken=data.token;
        
        localStorage.setItem("loginUser", data.user[0].name);
        localStorage.setItem("loginId", data.user[0].id);
        localStorage.setItem("userType", data.user[0].roleId);
        localStorage.setItem("contact", data.user[0].contact);
        localStorage.setItem("password", data.user[0].password);

        
        if(this.roleId==1){
          localStorage.setItem('token' , '');
        }else{
          localStorage.setItem('token' ,data.token);
        }
        //localStorage.setItem('token' ,data.token);
        //localStorage.setItem("expiryTime",(Date.now() + data.expiryTime * 1000).toString())
        localStorage.setItem("adminId", data.user[0].adminId);
        localStorage.setItem("superAdminId", data.user[0].superAdminId);
        localStorage.setItem("adminId", data.user[0].adminId)
        localStorage.setItem("loginAssembly", data.user[0].assemblyName);
        localStorage.setItem("loginDistrict", data.user[0].district);
        localStorage.setItem("loginVillage", data.user[0].village);
        localStorage.setItem("state", data.user[0].state);
        localStorage.setItem("superAdminName", data.user[0].superAdminName);
        const apkName = data.user[0].name;
        localStorage.setItem("apkName", apkName);
        if(data.user[0].roleId==1){
          this.router.navigate(['/superadmin'])
        }else{
        //    this.auth.sendOtp(this.loginModal.Username).subscribe((data) => {
        //    this.otpverify(data);
        // });
        this.router.navigate(['/home/mobile-dashboard'])
        }
        //this.router.navigate(['/home/mobile-dashboard'])
      }
      
    },
    (error)=>{
      this.loader.hideLoader();
      console.log(error.error.text);
      if(error.error.text=="User is Disabled"){
        console.log("User is Disabled")
        this.toast.presentToast("User disabled. Please contact administrator", "danger", 'alert-circle-sharp');
      } 
      if(error.error.text=="Invalid Username or Password!"){
        console.log("Invalid Username or Password!")
        this.toast.presentToast("Invalid Username or Password!", "danger", 'alert-circle-sharp');
      }
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
          this.loader.hideLoader();
          this.otpIsCheck = 1 ;
          // this.next();
          this.router.navigate(['/image']);
          this.toast.presentToast("Logged In Succesfully", "success", 'checkmark-circle-outline')
        }
        else {
          this.loader.hideLoader();
          this.toast.presentToast("Invalid OTP!", "danger", 'alert-circle-outline');
        }
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Please Enter OTP!", "danger", 'alert-circle-outline');
      }

    });
    return await modal.present();
  }

  onSubmit() {
    
  }

  // next() {
  //   this.start();
  // }

  // start() {
  //   SMSReceive.startWatch(
  //     () => {
  //       document.addEventListener('onSMSArrive', (e: any) => {
  //         var IncomingSMS = e.data;
  //         this.processSMS(IncomingSMS);
  //       });
  //     },
  //     () => { console.log('watch start failed') }
  //   )
  // }

  // stop() {
  //   SMSReceive.stopWatch(
  //     () => { console.log('watch stopped') },
  //     () => { console.log('watch stop failed') }
  //   )
  // }

  // processSMS(data) {
  //   const message = data.body;
  //   if (message && message.indexOf('enappd_starters') != -1) {
  //     this.generatedOtp = data.body.slice(0, 6);
  //     this.stop();
  //   }
  // }

}
 