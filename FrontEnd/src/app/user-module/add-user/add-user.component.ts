import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service'
import { UserService } from 'src/app/services/user.service'
import {LoaderService  } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { AssemblyService } from 'src/app/services/assembly.service'
import { WardService } from 'src/app/services/ward.service'
import { BoothService } from 'src/app/services/booth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  addUserModal: any = {};
  myForm;
  districtList: any;
  talukaList: any;
  assemblyList: any;
  wardList: any;
  boothList: any;

  roleHeader = {
    header: 'Select User Role',
  };

  stateHeader = {
    header : 'Select State'
  }

  distHeader = {
    header : 'Select District'
  }

  asmblyHeader = {
    header : 'Select Assembly'
  }

  talHeader = {
    header : 'Select Taluka'
  }

  wardHeader = {
    header : 'Select Ward'
  }

  bootheader = {
    header : 'Select Booth'
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
      private contact:ContactService,
      private user:UserService,
      private loader:LoaderService,
      private toast:IonicToastService,
      private assembly:AssemblyService,
      private ward:WardService,
      private booth:BoothService,
      private router:Router,
    ) 
    {

    }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }


  getDistrict(){
    this.contact.getDistrictData().subscribe(data=>{
      if(data.length > 0){
        this.districtList = data;
      }
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      if(data.length > 0){
        this.addUserModal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  

  getAssembly(){
    this.assembly.getAssemblyData().subscribe(data=>{
      if(data.length > 0){
        this.assemblyList = data;
      }
    })
  }

  getWard(){
    this.ward.getWardData().subscribe(data=>{
      if(data.length > 0){
        this.wardList = data;
      }
    })
  }

  getBooth(){
    this.booth.getBoothData().subscribe(data=>{
      if(data.length > 0){
        this.boothList = data;
      }
    })
  }

  ngOnInit() {
    this.getDistrict();
    this.getAssembly();
    this.getWard();
    this.getBooth();
  }

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.addUserModal.invalid){
      return;
    }else{

    }
    f.resetForm();
  }

  save(){
    this.loader.showLoading();
    this.addUserModal.RoleId = Number(this.addUserModal.RoleId);
    //this.addUserModal.createdDate 
    this.user.addUser(this.addUserModal).subscribe((data)=>{
      if(data){
        this.loader.hideLoader();
        this.addUserModal = {};
        this.router.navigate(['/user']);
        this.toast.presentToast("User added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("User not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) =>{
      this.loader.hideLoader();
      this.toast.presentToast("User not saved", "danger", 'alert-circle-sharp');
    })
  }

}
