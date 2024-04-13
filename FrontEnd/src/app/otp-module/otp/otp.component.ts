import { Component, OnInit,Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  @Input() otp: any
  enteredOtp;

  config = {
    length: 6,
    allowNumbersOnly: true,
    placeholder: '-',
    inputStyles: {
      'background': '#fafafa',
    },
    autoFocus: true
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(
    public menuCtrl: MenuController, 
    private modalController: ModalController, 
    public toast:IonicToastService, 
    private loader:LoaderService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onOtpChange(e:any) {
    this.enteredOtp = e;
  }

  dismiss(status:any) {
    this.modalController.dismiss({
      'status': status
    });
  }

  verify() {
    this.loader.showLoading();
    if (this.otp == this.enteredOtp) {
      this.router.navigate(['/image']);
      this.toast.presentToast("Logged In Succesfully", "success", 'checkmark-circle-sharp');
      this.loader.hideLoader();
    }
    else {
      this.loader.hideLoader();
      this.toast.presentToast("Invalid OTP!", "danger", 'alert-circle-outline');
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
