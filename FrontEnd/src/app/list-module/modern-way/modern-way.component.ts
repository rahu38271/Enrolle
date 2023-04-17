import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-modern-way',
  templateUrl: './modern-way.component.html',
  styleUrls: ['./modern-way.component.scss'],
})
export class ModernWayComponent implements OnInit {
  Language:any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  myForm1;
  searchModal: any = {
    LastName:'',
    FirstName:'',
    MiddleName:'',
    VotingCardNo:'',
    PartNo:'',
    MobileNo:'',
    HouseNo:'',
    FromAge:'',
    ToAge:'',
    Village:'',
    Gender:'',
    UserId:'',
    PageNo:'',
    NoofRow:'',
    Language:''
  };
  searchList: any[] =[];
  id: any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=10;

  constructor
    (
      public alertController: AlertController,
      public loadingController: LoadingController,
      public toastController: ToastController,
      private voter:VoterService,
      private loader:LoaderService,
      private toast:IonicToastService,
      private router:Router,
      private translateConfigService: TranslateConfigService,
    ) {
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
     }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
  }

   voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  voterListBySearch(){
    this.searchModal.Language = this.Language
    this.searchModal.PageNo = this.PageNo;
    this.searchModal.NoofRow = this.NoofRow;
    if(this.searchModal.LastName == ''){
      this.searchModal.LastName = null
    }
    else{
      this.searchModal.LastName = this.searchModal.LastName
    }
    if(this.searchModal.FirstName == ''){
      this.searchModal.FirstName = null
    }
    else{
      this.searchModal.FirstName = this.searchModal.FirstName 
    }
    if(this.searchModal.MiddleName == ''){
      this.searchModal.MiddleName = null
    }
    else{
      this.searchModal.MiddleName = this.searchModal.MiddleName 
    }
    if(this.searchModal.VotingCardNo == ''){
      this.searchModal.VotingCardNo = null
    }
    else{
      this.searchModal.VotingCardNo = this.searchModal.VotingCardNo 
    }
    if(this.searchModal.PartNo == ''){
      this.searchModal.PartNo = null
    }
    else{
      this.searchModal.PartNo = this.searchModal.PartNo 
    }
    if(this.searchModal.MobileNo == ''){
      this.searchModal.MobileNo = null
    }
    else{
      this.searchModal.MobileNo = this.searchModal.MobileNo 
    }
    if(this.searchModal.HouseNo == ''){
      this.searchModal.HouseNo = null
    }
    else{
      this.searchModal.HouseNo = this.searchModal.HouseNo 
    }
    if(this.searchModal.FromAge == ''){
      this.searchModal.FromAge = null
    }
    else{
      this.searchModal.FromAge = this.searchModal.FromAge;
    }
    if(this.searchModal.ToAge == ''){
      this.searchModal.ToAge = null
    }
    else{
      this.searchModal.ToAge = this.searchModal.ToAge;
    }
    if(this.searchModal.Gender == ''){
      this.searchModal.Gender = null
    }
    else{
      this.searchModal.Gender = this.searchModal.Gender;
    }
    if(this.searchModal.Village == ''){
      this.searchModal.Village = null
    }
    else{
      this.searchModal.Village = this.searchModal.Village;
    }
    this.searchModal.UserId = Number(this.id);
    this.searchModal.roleID = Number(this.roleID);
    this.searchModal.PageNo = Number(this.PageNo);
    this.searchModal.NoofRow = Number(this.NoofRow);
    this.loader.showLoading();
     this.voter.advanceSearch(this.searchModal).subscribe(data=>{
       if(data.length > 0){
        this.loader.hideLoader();
        this.searchList = data;
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
       }
       else{
         this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
       }
     },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
     })
  }

  resetForm(){
    this.myForm1.reset();
  }



  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table10');
    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
