import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssemblyService } from 'src/app/services/assembly.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-assembly',
  templateUrl: './add-assembly.component.html',
  styleUrls: ['./add-assembly.component.css']
})
export class AddAssemblyComponent implements OnInit {

  asemblyModal: any = {};
  myForm;

  
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
      private assembly:AssemblyService, 
      private toast:IonicToastService, 
      private loader:LoaderService
    ) { }


  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.asemblyModal.invalid){
      return;
    }
    f.resetForm();
  }

  addAssembly(){
    debugger;
    console.log(this.asemblyModal);
    this.loader.showLoading();
    this.assembly.addSingleAssembly(this.asemblyModal).subscribe(data => {
      if(data){
        console.log(data);
        this.toast.presentToast("Assembly added successfully!", "success", 'checkmark-circle-sharp');
        this.asemblyModal = {};
        this.loader.hideLoader();
      }
      else{
        this.toast.presentToast("Assembly not saved", "danger", 'alert-circle-sharp');
        this.loader.hideLoader();
      }
    }, (err) =>{
      this.toast.presentToast("Assembly not saved", "danger", 'alert-circle-sharp');
      this.loader.hideLoader();
    })
  }

}
