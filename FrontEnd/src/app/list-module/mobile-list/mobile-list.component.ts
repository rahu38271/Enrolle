import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService  } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {
  UserId:any;
  RoleId:any;
  imageUrl:any;
  id:any;
  Language: any;
  isShow = false;
  voterMobile: any;
  userId: any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor( 
    private router:Router, 
    private voter:VoterService,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService,
    private location:Location
     ) {
      this.Language = this.translateConfigService.getCurrentLang();
   }

  //  data with state
  //  voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

   // data with id
  voterDetails(data) {
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    
    }

    ionViewWillEnter(){
      this.mobileList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    }

    event(event:any){
      this.PageNo = event;
      this.mobileList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
    }

  mobileList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.Language = this.translateConfigService.getCurrentLang();
    //this.loader.showLoading();
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.voterWithMobile(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.voterMobile = data;
        this.totalItems = data[0].totalCount
      }
      else{
        //this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.mobileList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterWithMobile(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.voterMobile = data;
          this.totalItems = data[0].totalCount
        }
        else {
          //this.loader.hideLoader();
          this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
        }
      })
    }
  }

  

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterWithMobile(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.voterMobile = data;
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.voterMobile, 'Mobilelist Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  goBack(){
    this.location.back();
  }

  exportToCSV(){
    this.loader.showLoading();
    this.UserId = this.userId;
    this.RoleId = this.roleID;
    this.voter.voterWithMobileFile(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.saveFile(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  saveFile(imageData: Blob) {
    const blob = new Blob([imageData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // link.download = '';
    link.download = 'MatchedMobile.csv';
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

  }


