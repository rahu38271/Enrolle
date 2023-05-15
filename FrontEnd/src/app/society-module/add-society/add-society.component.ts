import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { SocietyService } from 'src/app/services/society.service';

@Component({
  selector: 'app-add-society',
  templateUrl: './add-society.component.html',
  styleUrls: ['./add-society.component.css']
})
export class AddSocietyComponent implements OnInit {

  districtList: any;
  talukaList: any;

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
        this.societyModal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }


  ngOnInit() {
    this.getDistrict();
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

  addSociety() {
    this.loader.showLoading();
    this.societyModal.PinCode = Number(this.societyModal.PinCode);
    this.societyModal.WardNo = Number(this.societyModal.WardNo);
    this.society.addSingleSociety(this.societyModal).subscribe((data) => {
      if (data) {
        this.toast.presentToast("Society added successfully!", "success", 'checkmark-circle-sharp');
        this.societyModal = {};
        this.loader.hideLoader();
        this.router.navigate(['/society']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Society not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      //this.toast.presentToast("Contact not saved!", "danger", 'alert-circle-sharp');
    });
  }

}