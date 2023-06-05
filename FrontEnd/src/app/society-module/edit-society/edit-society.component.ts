import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { SocietyService } from 'src/app/services/society.service';

@Component({
  selector: 'app-edit-society',
  templateUrl: './edit-society.component.html',
  styleUrls: ['./edit-society.component.css']
})
export class EditSocietyComponent implements OnInit {

  districtList: any;
  talukaList: any;
  loginId: any;
  name: any;
  adminId: any;
  superAdminId: any;
  roleId: any;
  position:any;

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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  myForm;

  year: number = new Date().getFullYear();

  societyModal: any = {};

  constructor
    (
      public popoverController: PopoverController,
      public toastController: ToastController,
      public contact: ContactService,
      private toast: IonicToastService,
      private loader:LoaderService,
      private router:Router,
      private society:SocietyService
    ) {
      
  }

  getDistrict() {
    this.societyModal = this.router.getCurrentNavigation().extras.state;
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
        this.societyModal.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  selected(event){
    this.position=event.target.value;
  }


  ngOnInit() {
    this.getDistrict();
    this.loginId = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.adminId = localStorage.getItem("adminId");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.roleId = localStorage.getItem("userType");
    this.roleId = Number(this.roleId);
  }

  resetForm() {
    this.myForm.reset();
  }


  onSubmit(f: NgForm) {
    if (this.societyModal.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

  EditSociety() {
    this.loader.showLoading();
    if(this.roleId == 2){
      this.societyModal.adminId = Number(this.loginId)
    }
    if(this.roleId == 3){
      this.societyModal.adminId = Number(this.superAdminId)
    }
    this.societyModal.id = Number(this.societyModal.id);
    if(this.societyModal.pinCode == 0 || this.societyModal.pinCode == ''){
      this.societyModal.pinCode = null;
    }
    else{
      this.societyModal.pinCode = Number(this.societyModal.pinCode);
    }
    if(this.societyModal.wardNo == 0 || this.societyModal.wardNo == ''){
      this.societyModal.wardNo = null;
    }
    else{
      this.societyModal.wardNo = Number(this.societyModal.wardNo);
    }
    if(this.societyModal.pinCode == 0){
      this.societyModal.pinCode = null;
    }
    if(this.societyModal.wardNo == 0){
      this.societyModal.wardNo = null;
    }
    this.societyModal.userName = this.name;
    this.societyModal.userId = Number(this.loginId);
    this.society.addSingleSociety(this.societyModal).subscribe((data) => {
      if (data) {
        this.toast.presentToast("Society updated successfully!", "success", 'checkmark-circle-sharp');
        this.societyModal = {};
        this.loader.hideLoader();
        this.router.navigate(['/society']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Society not updated", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      //this.toast.presentToast("Contact not saved!", "danger", 'alert-circle-sharp');
    });
  }

}
