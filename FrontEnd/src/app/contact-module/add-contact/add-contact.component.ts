import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {

  districtList: any;
  talukaList: any;
  maxDate:String = new Date().toISOString();

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

  myForm;

  year: number = new Date().getFullYear();

  contactModal: any = {};

  constructor
    (
      public popoverController: PopoverController,
      public toastController: ToastController,
      public contact: ContactService,
      private toast: IonicToastService,
      private loader:LoaderService,
      private router:Router
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
        this.contactModal.District = this.districtList.find(x => x.dId == dId).districtName;
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
    if (this.contactModal.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

  addContact() {
    var date = this.contactModal.Anniversary;
    
    if(this.contactModal.BirthDate == undefined){
      this.contactModal.BirthDate = '1900-01-01T00:00:00';
    }
    else{
      this.contactModal.BirthDate = this.contactModal.BirthDate + "T00:00:00";
    }

    //this.contactModal.BirthDate = this.contactModal.BirthDate + "T00:00:00";
    
    if(this.contactModal.Anniversary == undefined){
      this.contactModal.Anniversary = '1900-01-01T00:00:00';
    }
    else{
      this.contactModal.Anniversary = this.contactModal.Anniversary + "T00:00:00";
    }

    
    this.loader.showLoading();
    this.contact.addSingleContact(this.contactModal).subscribe((data) => {
      if (data) {
        this.toast.presentToast("Conact added successfully!", "success", 'checkmark-circle-sharp');
        this.contactModal = {};
        this.loader.hideLoader();
        this.router.navigate(['/contact']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Contact not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("Contact not saved!", "danger", 'alert-circle-sharp');
    });
  }
}

