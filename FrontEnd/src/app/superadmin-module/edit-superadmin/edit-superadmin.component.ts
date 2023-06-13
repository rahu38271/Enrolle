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
  adminId: any;
  loginId:any;
  superAdminId:any;
  roleId:any;
  roleName:any;
  isSA = false
  isA = false
  isV = false
  isSoc = false;
  isM = false;
  
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

    ngOnInit() {
      this.loginId = localStorage.getItem("loginId")
      this.adminId = localStorage.getItem("adminId")
      this.superAdminId = localStorage.getItem("superAdminId");
  
      this.roleId = localStorage.getItem("userType")
      this.roleId = Number(this.roleId);
      if(this.roleId == 1){
        this.isSA = !this.isSA;
        this.isA = !this.isA;
        this.isV = !this.isV;
        this.isSoc = !this.isSoc
        this.isM = !this.isM
      }
      
      if(this.roleId == 2){
        this.isA = !this.isA;
        this.isV = !this.isV;
        this.isSoc = !this.isSoc
        this.isM = !this.isM
      }
      
      if(this.roleId == 3){
        this.isV = !this.isV;
        this.isSoc = !this.isSoc
        this.isM = !this.isM
      }

      if(this.roleId == 5){
        this.isM = !this.isM
      }

      this.getAssembly();
      this.getDistrict();
    }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  getDistrict() {
    this.editData = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getAssembly(){
    this.assembly.getAssemblyData().subscribe(data=>{
      if(data.length > 0){
        //console.log(data);
        this.assemblyList = data;
      }
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

  editAdmin(){
    this.editData.id = Number(this.editData.id);
    if(this.editData.roleName == "MasterAdmin"){
      this.editData.roleId = 1
    }
    if(this.editData.roleName == "SuperAdmin"){
      this.editData.roleId = 2
    }
    if(this.editData.roleName == "Admin"){
      this.editData.roleId = 3
    }
    if(this.editData.roleName == "Volunteer"){
      this.editData.roleId = 4
    }
    if(this.editData.roleName == "Society"){
      this.editData.roleId = 5
    }
    if(this.editData.roleName == "Member"){
      this.editData.roleId = 6
    }
    this.editData.roleName = this.editData.roleName
    
    if(this.editData.roleId == 2){
      this.editData.superAdminId = Number(this.loginId);
    }
    if(this.editData.roleId == 3){
      this.editData.superAdminId = Number(this.loginId);
    }
    if(this.editData.roleId == 4){
      this.editData.superAdminId = Number(this.superAdminId);
      this.editData.adminId = Number(this.loginId);
    }
    if(this.editData.roleId == 5){
      this.editData.superAdminId = Number(this.superAdminId);
      this.editData.adminId = Number(this.loginId);
    }
    if(this.editData.roleId == 6){
      this.editData.superAdminId = Number(this.superAdminId);
      this.editData.adminId = Number(this.loginId);
    }

    this.loader.showLoading();
    this.sadmin.edit(this.editData).subscribe((data)=>{
        if(data){
          this.editData={};
          this.loader.hideLoader();
          this.toast.presentToast("User updated successfully!", "success", 'checkmark-circle-sharp');
          this.router.navigate(['/superadmin']);
        }
        else{
          this.loader.hideLoader();
        this.toast.presentToast("User not updated", "danger", 'alert-circle-sharp');
        }
    }, (err)=>{
      this.loader.hideLoader();
      //this.toast.presentToast("Superadmin not updated", "danger", 'alert-circle-sharp');
    })
  }
  

  // editAdmin(){
  //   debugger;
  //   this.editData.id = Number(this.editData.id);
  //   this.editData.roleId = Number(this.editData.roleId);
  //   if(this.editData.roleId == 2){
  //     this.editData.superAdminId = Number(this.loginId);
  //   }
  //   if(this.editData.roleId == 3){
  //     this.editData.superAdminId = Number(this.loginId);
  //   }
  //   if(this.editData.roleId == 4){
  //     this.editData.superAdminId = Number(this.superAdminId);
  //     this.editData.adminId = Number(this.loginId);
  //   }

  //   this.loader.showLoading();
  //   this.sadmin.edit(this.editData).subscribe((data)=>{
  //     if(data){
  //       this.editData={};
  //       this.loader.hideLoader();
  //       this.toast.presentToast("Superadmin updated successfully!", "success", 'checkmark-circle-sharp');
  //       this.router.navigate(['/superadmin']);
        
  //     }
  //     else{
  //       this.loader.hideLoader();
  //       this.toast.presentToast("Superadmin not updated", "danger", 'alert-circle-sharp');
  //     }
  //   }, (err)=>{
  //     this.loader.hideLoader();
  //     this.toast.presentToast("Superadmin not updated", "danger", 'alert-circle-sharp');
  //   })
  // }

  

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
