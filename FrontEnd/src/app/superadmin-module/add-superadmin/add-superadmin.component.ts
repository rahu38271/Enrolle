import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssemblyService } from 'src/app/services/assembly.service'
import { SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-superadmin',
  templateUrl: './add-superadmin.component.html',
  styleUrls: ['./add-superadmin.component.css']
})
export class AddSuperadminComponent implements OnInit {

  addMAmodal: any = { };
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
      private assembly: AssemblyService,
      private sadmin: SuperadminService,
      private loader: LoaderService,
      private toast: IonicToastService,
      public contact: ContactService,
      private router: Router,
      private changeDetection: ChangeDetectorRef
  ) { }

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  getAssembly() {
    this.assembly.getAssemblyData().subscribe(data => {
      if (data.length > 0) {
        //console.log(data);
        this.assemblyList = data;
      }
    })
  }

  getDistrict() {
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        this.addMAmodal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  getVillage(taluka: any) {
    this.contact.getVillageData(taluka).subscribe((data) => {
      if (data.length > 0) {
        this.addMAmodal.Taluka = this.talukaList.find(x => x.talukaName = taluka).talukaName;
        this.villageList = data;
      }
    })
  }

  ngOnInit() {
    this.loginId = localStorage.getItem("loginId");
    this.adminId = localStorage.getItem("adminId");
    this.superAdminId = localStorage.getItem("superAdminId")
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
    

    this.getAssembly();
    this.getDistrict();
  }

  addMAdmin() {
    debugger;
    this.addMAmodal.RoleId = Number(this.addMAmodal.RoleId);
    if(this.addMAmodal.RoleId == 2){
      this.addMAmodal.SuperAdminId = Number(this.loginId);
    }
    if(this.addMAmodal.RoleId == 3){
      this.addMAmodal.SuperAdminId = Number(this.loginId);
    }
    if(this.addMAmodal.RoleId == 4){
      this.addMAmodal.SuperAdminId = Number(this.superAdminId);
      this.addMAmodal.AdminId = Number(this.loginId);
    }
    if(this.addMAmodal.RoleId == 5){
      this.addMAmodal.SuperAdminId = Number(this.superAdminId);
      this.addMAmodal.AdminId = Number(this.loginId);
    }
    if(this.addMAmodal.RoleId == 6){
      this.addMAmodal.SuperAdminId = Number(this.superAdminId);
      this.addMAmodal.AdminId = Number(this.loginId);
    }
    this.loader.showLoading();
    this.sadmin.addMAdminData(this.addMAmodal).subscribe((data) => {
      if (data) {
        this.loader.hideLoader();
        this.addMAmodal = {};
        this.toast.presentToast("Superadmin added successfully!", "success", 'checkmark-circle-sharp');
        //this.router.navigate(['/superadmin']);
        this.router.navigateByUrl('/superadmin')
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Superadmin not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      //this.toast.presentToast("Superadmin not saved", "danger", 'alert-circle-sharp');
    })
  }



  resetForm() {
    this.myForm.reset();
  }

  onSubmit(f: NgForm) {
    if (this.addMAmodal.invalid) {
      return;
    } else {

    }
    f.resetForm();
  }

}
