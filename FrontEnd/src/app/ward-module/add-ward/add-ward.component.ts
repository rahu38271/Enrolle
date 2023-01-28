import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { WardService } from 'src/app/services/ward.service';
import { BoothService} from 'src/app/services/booth.service'

@Component({
  selector: 'app-add-ward',
  templateUrl: './add-ward.component.html',
  styleUrls: ['./add-ward.component.css']
})
export class AddWardComponent implements OnInit {

  addWardModal: any = {};
  myForm;
  boothList: any;
  booths: any;
  
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

  constructor
    (
      private loader:LoaderService,
      private toast:IonicToastService,
      private ward:WardService,
      private booth:BoothService
    ) 
    {

     }

     getBooth(){
      this.booth.getBoothData().subscribe(data=>{
        if(data.length > 0){
          console.log(data);
          this.boothList = data;
        }
      })
    }

  ngOnInit() {
    this.getBooth();
  }

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.addWardModal.invalid){
      return;
    }else{

    }
    f.resetForm();
  }

  

  addWard(){
    this.loader.showLoading();
    this.ward.addSingleWard(this.addWardModal).subscribe((data)=>{
      if(data){
        console.log(data);
        this.addWardModal = {};
        this.loader.hideLoader();
        this.toast.presentToast("Ward added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.toast.presentToast("Ward not saved", "danger", 'alert-circle-sharp')
        this.loader.hideLoader();
      }
    }, (err)=>{
      this.toast.presentToast("Ward not saved", "danger", 'alert-circle-sharp');
      this.loader.hideLoader();
    })
  }

}
