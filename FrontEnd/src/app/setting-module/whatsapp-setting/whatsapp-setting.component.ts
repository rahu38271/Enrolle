import { Component, OnInit } from '@angular/core';
import { SettingService} from 'src/app/services/setting.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-whatsapp-setting',
  templateUrl: './whatsapp-setting.component.html',
  styleUrls: ['./whatsapp-setting.component.scss'],
})
export class WhatsappSettingComponent implements OnInit {

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

  whatsappSetting: any = {

   };
  
  constructor(
    private setting:SettingService,
    private loader:LoaderService,
    private toast:IonicToastService
    ) { 
    this.whatsappSetting.mtype="Text"
    this.whatsappSetting.msgType ="Birthday"
  }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  whastappSetting(){
    debugger;
    this.loader.showLoading();
    this.setting.whatsappMsgSetting(this.whatsappSetting).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        console.log(data);
        this.toast.presentToast("Setting added successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
        this.toast.presentToast("Setting not added", "danger", 'alert-circle-sharp');
      }
    },(err) =>{
      this.loader.hideLoader();
      this.toast.presentToast("Setting not added", "danger", 'alert-circle-sharp');
    })
  }

  onSubmit(){
    if(this.whatsappSetting.invalid){
      return
    }
  }

}
