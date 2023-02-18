import { Component, OnInit } from '@angular/core';
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
      private router: Router
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
        this.addMAmodal.District = this.districtList.find(x => x.dId == dId).districtName;
        //this.addMAmodal.Taluka = this.talukaList.find( x=> x.taluka = taluka).talukaName;
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
    this.getAssembly();
    this.getDistrict();
  }

  addMAdmin() {
    this.addMAmodal.RoleId = Number(this.addMAmodal.RoleId)
    this.loader.showLoading();
    this.sadmin.addMAdminData(this.addMAmodal).subscribe(data => {
      if (data) {
        this.addMAmodal = {};
        this.loader.hideLoader();
        this.toast.presentToast("Superadmin added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/superadmin']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Superadmin not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("Superadmin not saved", "danger", 'alert-circle-sharp');
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
