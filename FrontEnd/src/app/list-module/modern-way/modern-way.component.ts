import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modern-way',
  templateUrl: './modern-way.component.html',
  styleUrls: ['./modern-way.component.scss'],
})
export class ModernWayComponent implements OnInit {
  Language:any;
  isShow = false;
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
    Caste:'',
    Religion:'',
    Society:'',
    Occupation:'',
    Education:'',
    UserId:'',
    PageNo:'',
    NoofRow:'',
    Language:''
  };
  searchList: any;
  id: any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  casteList: any;
  professionList:any;
  imageUrl: string;

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

omit_special_char(event) {
  var k;
  k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

  constructor
    (
      public alertController: AlertController,
      public loadingController: LoadingController,
      public toastController: ToastController,
      private voter:VoterService,
      private loader:LoaderService,
      private toast:IonicToastService,
      private router:Router,
      private excel:ExcelService,
      private csv:CsvService,
      private location:Location,
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

  ionViewWillEnter(){
    this.AllCasts();
    this.allProfession();
  }

  //  voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

       // data with id
  voterDetails(id: number) {
    this.router.navigate(['/voterdata-management/voter-details', id])
  }

   event(event: any) {
    this.PageNo = event;
    this.voterListBySearch()
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  voterListBySearch(){
    this.isShow = true
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
    //this.NoofRow=this.totalItems;
    // this.PageNo=this.PageNo;
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
      this.searchModal.FromAge = Number(this.searchModal.FromAge);
    }
    if(this.searchModal.ToAge == ''){
      this.searchModal.ToAge = null
    }
    else{
      this.searchModal.ToAge = Number(this.searchModal.ToAge);
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
    if(this.searchModal.Caste == ''){
      this.searchModal.Caste = null
    }
    else{
      this.searchModal.Caste = this.searchModal.Caste;
    }
    if(this.searchModal.Occupation == ''){
      this.searchModal.Occupation = null
    }
    else{
      this.searchModal.Occupation = this.searchModal.Occupation;
    }
    if(this.searchModal.Education == ''){
      this.searchModal.Education = null
    }
    else{
      this.searchModal.Education = this.searchModal.Education;
    }
    if(this.searchModal.Religion == ''){
      this.searchModal.Religion = null
    }
    else{
      this.searchModal.Religion = this.searchModal.Religion;
    }
    if(this.searchModal.Society == ''){
      this.searchModal.Society = null
    }
    else{
      this.searchModal.Society = this.searchModal.Society;
    }
    this.searchModal.UserId = Number(this.id);
    this.searchModal.roleID = Number(this.roleID);
    if(this.searchModal.FromAge == 0){
      this.searchModal.FromAge = null
    }
    if(this.searchModal.ToAge == 0){
      this.searchModal.ToAge = null
    }
    this.loader.showLoading();
     this.voter.advanceSearch(this.searchModal).subscribe(data=>{
       if(data.length != 0){
        this.loader.hideLoader();
        this.searchList = data;
        this.totalItems = data[0].totalCount
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
       }
       else{
         this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
       }
     },(err)=>{
      this.loader.hideLoader();
      //this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
     })
  }

  resetForm(){
    this.myForm1.reset();
  }

  trimInput(){
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

  saveCSVFile(imageData: Blob) {
    const blob = new Blob([imageData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // link.download = '';
    link.download = 'advanceSearch.csv';
    link.click();
  }

  saveExcelFile(imageData: Blob) {
    const blob = new Blob([imageData], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // link.download = '';
    link.download = 'advanceSearch.xls';
    link.click();
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  exportExcel(){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.searchModal.NoofRow=this.totalItems;
    this.searchModal = this.searchModal;
    this.loader.showLoading();
    this.voter.getAdvancedSearchFile(this.searchModal).subscribe((data:Blob)=>{
      if(data.size!=0){
        this.loader.hideLoader();
        this.saveExcelFile(data);
        this.fetchImage(data);
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportToCSV(){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.searchModal.NoofRow=this.totalItems;
    this.searchModal = this.searchModal;
    this.loader.showLoading();
    this.voter.getAdvancedSearchFile(this.searchModal).subscribe((data:Blob)=>{
      if(data.size!=0){
        this.loader.hideLoader();
        this.saveCSVFile(data);
        this.fetchImage(data);
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  // exportExcel():void {
  //   this.PageNo=1;
  //   this.NoofRow=this.totalItems;
  //   this.searchModal.NoofRow=this.totalItems;
  //   this.loader.showLoading();
  //   this.voter.advanceSearch(this.searchModal).subscribe(data=>{
  //     if(data.length != 0){
  //       this.loader.hideLoader();
  //       this.searchList = data;
  //       this.searchList.forEach(e => {
  //         delete e.totalCount;
  //         delete e.isVoted;
  //         delete e.isAlive;
  //         delete e.id;
  //       });
  //       this.excel.exportAsExcelFile(this.searchList, 'Advance Search');
  //       this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
  //     }
  //     else{
  //       this.loader.hideLoader();
  //       this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
  //     }
  //   },(err)=>{
  //     this.loader.hideLoader();
  //   })
  // }



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

  AllCasts(){
    this.Language = "English"
    this.voter.getAllCaste(this.Language).subscribe(data=>{
      this.casteList=data;
    })
  }

  allProfession(){
    this.voter.getAllProfession().subscribe(data=>{
      this.professionList = data;
    },(err)=>{

    })
  }

  goBack(){
    this.location.back();
  }

}
