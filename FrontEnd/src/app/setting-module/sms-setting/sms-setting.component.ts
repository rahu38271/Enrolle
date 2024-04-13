import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrls: ['./sms-setting.component.scss'],
})
export class SmsSettingComponent implements OnInit {
  smsSetting:any={}
  isEditMode: boolean = false;
  type: any;
  Mtype: string;
  getBirthday: any;
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

  constructor(
    private setting:SettingService,
    private loader:LoaderService,
    private toast:IonicToastService
  ) { }

  ngOnInit() {
    this.setting.getBirthdaySMS().subscribe(data=>{
      console.log(data);
      this.getBirthday = data;
    })
    this.setting.getAnniversarySMS().subscribe(data=>{
      console.log(data);
    })
  }



  addSMSSetting(){
    this.loader.showLoading();
    this.smsSetting.Type = Number(this.smsSetting.Type);
    this.setting.addBdayAnniSetting(this.smsSetting).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.smsSetting={}
        this.toast.presentToast("Setting added successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
        this.toast.presentToast("Setting not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Setting not added", "danger", 'alert-circle-sharp');
    })
  }

}
