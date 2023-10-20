import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { VoterService } from 'src/app/services/voter.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router'
import { Voter } from 'src/app/models/voter'
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-voterdata-management',
  templateUrl: './voterdata-management.component.html',
  styleUrls: ['./voterdata-management.component.scss'],
})
export class VoterdataManagementComponent {
  Language: any;
  myForm1: any;
  searchWeb: string;

  isShow = true;
  searchedData: any;
  ColumnValue: any;
  partNumber: any;
  id: any;
  userId: any;
  roleID: any
  voterByPart: any;
  searchedVoterByPart: any;
  isSearched = false;
  isList = true;

  searchModal: any = {
    LastName: '',
    FirstName: '',
    MiddleName: '',
    VotingCardNo: '',
    PartNo: '',
    MobileNo: '',
    HouseNo: '',
    FromAge: '',
    ToAge: '',
    Village: '',
    Gender: '',
    Occupation: '',
    Education: '',
    Caste: '',
    Religion: '',
    Society: '',
    UserId: '',
    roleID: '',
    PageNo: '',
    NoofRow: '',
    Language: ''
  };
  partNo: any;
  booth:any;
  PageNo: number = 1;
  NoofRow: number = 25;
  //allVoters: number = 0;
  totalItems: any;
  SearchText: any;
  UserId: any;
  casteList: any;
  search() {
    this.isShow = !this.isShow
  }

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

  constructor
    (
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertController: AlertController,
      private voter: VoterService,
      private toast: IonicToastService,
      private loader: LoaderService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private excel: ExcelService,
      private csv: CsvService,
      public translate: TranslateService,
      private translateConfigService: TranslateConfigService,
    ) {
    this.Language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }

  }

  ionViewWillEnter() {
    this.partNo = this.route.snapshot.paramMap.get('partNo');
    this.booth = this.route.snapshot.paramMap.get('booth');
    this.userId = this.route.snapshot.paramMap.get('id');
    this.roleID = localStorage.getItem("userType");
    this.UserId = localStorage.getItem('loginId');
    this.boothWiseVoterListData(this.PageNo, this.NoofRow, this.Language);
    this.AllCasts();
  }

  event(event: any) {
    this.PageNo = event;
    this.boothWiseVoterListData(event, this.NoofRow, this.Language)
  }

  event1(event: any) {
    this.PageNo = event;
    this.searchData();
  }

  boothWiseVoterListData(PageNo: any, NoofRow: any, Language: any) {
    this.isSearched = false;
    this.isList = true;
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
    this.voter.boothWiseVoterList(this.partNo, PageNo, NoofRow, this.Language).subscribe((data: any) => {
      this.loader.hideLoader();
      if (data.length != 0) {
        this.partNo = this.partNo
        this.voterByPart = data;
        this.totalItems = data[0].totalCount
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }



  goBack() {
    this.location.back();
  }

  voterDetails(id: number) {
    this.router.navigate(['voterdata-management/voter-details', id])
  }


  EditVoter(data: any) {
    debugger;
    this.router.navigateByUrl('/voterdata-management/edit-voterdata', { state: data })
  }

  resetForm() {
    this.myForm1.reset();
  }

  searchData() {
    this.isSearched = true;
    this.isList = false;
    this.searchModal.Language = this.Language;
    this.NoofRow = this.totalItems;
    this.PageNo = 1;
    if (this.searchModal.LastName == '') {
      this.searchModal.LastName = null
    }
    else {
      this.searchModal.LastName = this.searchModal.LastName
    }
    if (this.searchModal.FirstName == '') {
      this.searchModal.FirstName = null
    }
    else {
      this.searchModal.FirstName = this.searchModal.FirstName
    }
    if (this.searchModal.MiddleName == '') {
      this.searchModal.MiddleName = null
    }
    else {
      this.searchModal.MiddleName = this.searchModal.MiddleName
    }
    if (this.searchModal.VotingCardNo == '') {
      this.searchModal.VotingCardNo = null
    }
    else {
      this.searchModal.VotingCardNo = this.searchModal.VotingCardNo
    }
    if (this.searchModal.PartNo == '') {
      this.searchModal.PartNo = null
    }
    else {
      this.searchModal.PartNo = this.searchModal.PartNo
    }
    if (this.searchModal.MobileNo == '') {
      this.searchModal.MobileNo = null
    }
    else {
      this.searchModal.MobileNo = this.searchModal.MobileNo
    }
    if (this.searchModal.HouseNo == '') {
      this.searchModal.HouseNo = null
    }
    else {
      this.searchModal.HouseNo = this.searchModal.HouseNo
    }
    if (this.searchModal.FromAge == '') {
      this.searchModal.FromAge = null
    }
    else {
      this.searchModal.FromAge = Number(this.searchModal.FromAge);
    }
    if (this.searchModal.ToAge == '') {
      this.searchModal.ToAge = null
    }
    else {
      this.searchModal.ToAge = Number(this.searchModal.ToAge);
    }
    if (this.searchModal.Gender == '') {
      this.searchModal.Gender = null
    }
    else {
      this.searchModal.Gender = this.searchModal.Gender;
    }
    if (this.searchModal.Village == '') {
      this.searchModal.Village = null
    }
    else {
      this.searchModal.Village = this.searchModal.Village;
    }
    if (this.searchModal.Occupation == '') {
      this.searchModal.Occupation = null
    }
    else {
      this.searchModal.Occupation = this.searchModal.Occupation;
    }
    if (this.searchModal.Education == '') {
      this.searchModal.Education = null
    }
    else {
      this.searchModal.Education = this.searchModal.Education;
    }
    if (this.searchModal.Caste == '') {
      this.searchModal.Caste = null
    }
    else {
      this.searchModal.Caste = this.searchModal.Caste;
    }
    if (this.searchModal.Society == '') {
      this.searchModal.Society = null
    }
    else {
      this.searchModal.Society = this.searchModal.Society;
    }
    if (this.searchModal.Religion == '') {
      this.searchModal.Religion = null
    }
    else {
      this.searchModal.Religion = this.searchModal.Religion;
    }
    this.searchModal.PageNo = Number(this.PageNo);
    this.searchModal.NoofRow = Number(this.NoofRow);
    this.searchModal.UserId = Number(this.userId);
    this.searchModal.roleID = Number(this.roleID);
    if (this.searchModal.FromAge == 0) {
      this.searchModal.FromAge = null;
    }
    if (this.searchModal.ToAge == 0) {
      this.searchModal.ToAge = null;
    }

    this.searchModal.PartNo = this.partNo;
    this.loader.showLoading();
    this.voter.advanceSearch(this.searchModal).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.searchedVoterByPart = data;
        this.totalItems = data[0].totalCount
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }

  trimInput() {
    this.searchModal.LastName = this.searchModal.LastName.trim();
    this.searchModal.FirstName = this.searchModal.FirstName.trim();
    this.searchModal.MiddleName = this.searchModal.MiddleName.trim();
    this.searchModal.VotingCardNo = this.searchModal.VotingCardNo.trim();
    this.searchModal.FromAge = this.searchModal.FromAge.trim();
    this.searchModal.ToAge = this.searchModal.ToAge.trim();
    this.searchModal.PartNo = this.searchModal.PartNo.trim();
    this.searchModal.MobileNo = this.searchModal.MobileNo.trim();
    this.searchModal.Village = this.searchModal.Village.trim();
    this.searchModal.HouseNo = this.searchModal.HouseNo.trim();
    this.searchModal.Occupation = this.searchModal.Occupation.trim();
    this.searchModal.Education = this.searchModal.Education.trim();
    this.searchModal.Society = this.searchModal.Society.trim();
    this.searchModal.Religion = this.searchModal.Religion.trim();
  }

  async deleteVoter(id: any) {
    const alert = await this.alertController.create({
      header: ' Delete Voter ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this voter',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: 'yes',
          handler: () => {
            this.voter.deleteVoter(id).subscribe(data => {
              this.ionViewWillEnter()
              this.toast.presentToast("Voter deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }


  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    this.Language = this.Language;
    this.loader.showLoading();
    this.voter.boothWiseVoterList(this.partNo, this.PageNo, this.NoofRow, this.Language).subscribe((data: any) => {
      this.loader.hideLoader();
      if (data) {
        this.voterByPart = data;
        this.voterByPart.forEach(e => {
          delete e.totalCount;
        });
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.voterByPart, 'Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    })

  }

  searchedExcel() {
    this.loader.showLoading();
    this.voter.advanceSearch(this.searchModal).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.searchedVoterByPart = data;
        this.searchedVoterByPart.forEach(e => {
          delete e.totalCount;
        });
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.searchedVoterByPart, 'Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    })
  }

  exportToCSV() {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    this.Language = this.Language;
    this.loader.showLoading();
    this.voter.advanceSearch(this.searchModal).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.searchedVoterByPart = data;
        this.searchedVoterByPart.forEach(e => {
          delete e.totalCount;
          delete e.id;
        });
        this.csv.exportToCsv(this.voterByPart, 'Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }

    }, (err) => {
      this.loader.hideLoader();
    })

  }

  searchedCSV() {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    this.Language = this.Language;
    this.loader.showLoading();
    this.voter.advanceSearch(this.searchModal).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.searchedVoterByPart = data;
        this.searchedVoterByPart.forEach(e => {
          delete e.totalCount;
          delete e.id;
        });
        this.totalItems = data[0].totalCount;
        this.csv.exportToCsv(this.searchedVoterByPart, 'Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }

    }, (err) => {
      this.loader.hideLoader();
    })
  }

  AllCasts() {
    this.voter.getAllCaste(this.Language).subscribe(data => {
      this.casteList = data;
    })
  }

}


