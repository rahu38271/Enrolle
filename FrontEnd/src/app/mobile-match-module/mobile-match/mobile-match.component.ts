import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-mobile-match',
  templateUrl: './mobile-match.component.html',
  styleUrls: ['./mobile-match.component.scss'],
})
export class MobileMatchComponent implements OnInit {

  myForm1: any;
  Lname = '';
  Mname = '';
  Fname = '';
  Address = '';
  Dname = '';
  Vid = '';
  radio = '';
  Name: any;
  searchMobName: any = {}
  matchedMobName: any;
  SearchText: any;
  Language: any;
  id: any;
  RoleId: any;
  PageNo: any;
  NoofRow: any;
  voterListByUser: any;
  isShow = true;
  isMatchShow = true;
  mobUpdate: any = {};
  VoterId: any;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(
    public alertController: AlertController,
    private voter: VoterService,
    private loader: LoaderService,
    private toast: IonicToastService,
    private translateConfigService: TranslateConfigService
  ) { }

  resetForm() {
    this.myForm1.reset();
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  ngOnInit() {
    //this.searchedName();
    this.Language = this.translateConfigService.getCurrentLang();
    this.id = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
  }

  // searching in mobile list data

  nameInMobileData() {
    this.loader.showLoading();
    this.searchMobName.Name = this.searchMobName.Fname + ' ' + this.searchMobName.Mname + ' ' + this.searchMobName.Lname
    this.voter.getMobileMatchedName(this.searchMobName.Name).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.matchedMobName = data;
        this.matchedMobName = data[0];
        this.isShow = false;
        this.isMatchShow = false;
        if (this.matchedMobName.altMobileNo == 'null') {
          this.matchedMobName.altMobileNo = ''
        }
        else {
          this.matchedMobName.altMobileNo = this.matchedMobName.altMobileNo
        }
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
        this.matchedMobName.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        })

      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data found", "danger", 'alert-circle-sharp');
        this.isShow = true;
        this.isMatchShow = true;
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }

  // searching in voter list data

  nameInVoterData() {
    this.loader.showLoading();
    this.searchMobName.Name = this.searchMobName.Fname + ' ' + this.searchMobName.Mname + ' ' + this.searchMobName.Lname;
    this.SearchText = this.searchMobName.Name;
    this.PageNo = 1;
    this.NoofRow = 1;
    this.id = Number(this.id);
    this.RoleId = Number(this.RoleId);
    this.Language = this.translateConfigService.getCurrentLang();
    if (this.Language == "kn") {
      this.Language = "Kannada"
    }
    else if (this.Language == "mr") {
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else {
      this.Language = "English"
    }
    this.voter.getVoterByUser(this.id, this.RoleId, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.voterListByUser = data;
        this.VoterId = data[0].id;
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
        this.isShow = false;
        this.isMatchShow = false;
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
        this.isShow = true;
        this.isMatchShow = true;
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }

  // match mobile from mobile excel to voterlist data

  matchMobile() {
    debugger;
    this.loader.showLoading();
    this.mobUpdate.Id = this.VoterId;
    this.mobUpdate.Mobile = this.matchedMobName.mobileNo;
    this.voter.updateMob(this.mobUpdate.Id, this.mobUpdate.Mobile).subscribe(data => {
      if (data) {
        this.loader.hideLoader();
        this.mobUpdate = {};
        this.toast.presentToast("Mobile No. matched successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Mobile No. not matched", "danger", 'alert-circle-outline');
      }
    }, (_err) => {
      this.loader.hideLoader();
    })
  }

  trimInput() {
    this.searchMobName.Fname = this.searchMobName.Fname.trim();
    this.searchMobName.Mname = this.searchMobName.Mname.trim();
    this.searchMobName.Lname = this.searchMobName.Lname.trim();
  }

  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table51');

    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save(); { };

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
