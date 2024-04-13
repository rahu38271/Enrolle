import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

  districtList: any;
  talukaList: any;
  id: any;
  edModal: any = {};
  anniversary;
  EditData: any = {};
  maxDate: String = new Date().toISOString();

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


  year: number = new Date().getFullYear();

  constructor(private contact: ContactService, private loader: LoaderService,
    private toast: IonicToastService, private router: Router) {

  }

  ngOnInit() {
    this.getDistrict();
  }

  getDistrict() {
    this.EditData = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        this.districtList = data;
        //this.EditData.dId =  this.districtList.find(x => x.districtName == this.EditData.district).dId;
        //this.getTaluka(this.EditData.dId);
      }
    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        this.EditData.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  

  save() {
    debugger;
    if (this.EditData.birthDate == "") {
      this.EditData.birthDate = '1900-01-01T00:00:00';
    }
    else {
      this.EditData.birthDate = this.EditData.birthDate;
    }

    //this.contactModal.BirthDate = this.contactModal.BirthDate + "T00:00:00";

    if (this.EditData.anniversary == "") {
      this.EditData.anniversary = '1900-01-01T00:00:00';
    }
    else {
      this.EditData.anniversary = this.EditData.anniversary;
    }
    this.loader.showLoading();
    this.contact.update(this.EditData).subscribe((data) => {
      if (data) {
        this.loader.hideLoader();
        this.EditData = {};
        this.toast.presentToast("Conact updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/contact']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Contact not updated", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }
}
