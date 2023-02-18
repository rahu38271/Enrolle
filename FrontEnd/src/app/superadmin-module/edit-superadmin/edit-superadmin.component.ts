import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssemblyService } from 'src/app/services/assembly.service'
import {SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService} from 'src/app/services/loader.service'
import {IonicToastService } from 'src/app/services/ionic-toast.service'
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-edit-superadmin',
  templateUrl: './edit-superadmin.component.html',
  styleUrls: ['./edit-superadmin.component.css']
})
export class EditSuperadminComponent implements OnInit {

  editData: any = {};
  myForm;
  Quote;
  assemblyList: any;
  districtList: any;
  talukaList: any;
  villageList: any;
  
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
      private sadmin:SuperadminService,
      private loader:LoaderService,
      private toast:IonicToastService,
      public contact: ContactService,
      private router:Router
    ) 
    { }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  getAssembly(){
    this.assembly.getAssemblyData().subscribe(data=>{
      if(data.length > 0){
        //console.log(data);
        this.assemblyList = data;
      }
    })
  }

  getDistrict() {
    this.editData = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.editData.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  getVillage(taluka:any){
    this.contact.getVillageData(taluka).subscribe((data)=>{
      if(data.length > 0){
        this.editData.Taluka = this.talukaList.find( x => x.talukaName == taluka).talukaName;
        this.villageList = data;
      }
    })
  }


  ngOnInit() {
    this.getAssembly();
    this.getDistrict();
  }

  editAdmin(){
    debugger;
    this.editData.id = Number(this.editData.id);
    this.loader.showLoading();
    this.sadmin.edit(this.editData).subscribe(data=>{
      if(data){
        this.editData = {};
        this.loader.hideLoader();
        this.toast.presentToast("Superadmin updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/superadmin']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Superadmin not updated", "danger", 'alert-circle-sharp');
      }
    }, (err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Superadmin not updated", "danger", 'alert-circle-sharp');
    })
  }

  

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.editData.invalid){
      return;
    }else{

    }
    f.resetForm();
  }

}
