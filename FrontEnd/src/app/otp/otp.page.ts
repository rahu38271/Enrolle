import { Component, Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { IonicToastService } from '../services/ionic-toast.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {

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

  constructor( public menuCtrl: MenuController, private modalController: ModalController, public toast:IonicToastService, private loader:LoaderService) { }

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
      this.loader.showLoading();
      this.dismiss(true);
    }
    else {
      this.dismiss(false);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
