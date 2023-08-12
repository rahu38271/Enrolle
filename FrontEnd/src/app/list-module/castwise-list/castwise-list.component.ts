import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-castwise-list',
  templateUrl: './castwise-list.component.html',
  styleUrls: ['./castwise-list.component.scss'],
})
export class CastwiseListComponent implements OnInit {

  Language:any;
  isShow = false;
  partNumber: any;
  caste:any;
  userId:any;
  searchMob:string;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  VoterwithCaste:any;
  SearchText:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private router:Router, 
    private voter:VoterService, 
    private route:ActivatedRoute,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    private excel:ExcelService,
    private csv:CsvService,
    private toast:IonicToastService,
    private location: Location
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.caste = this.route.snapshot.paramMap.get('Caste');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.casteWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  event(event:any){
    this.PageNo = event;
    this.casteWiseVoter(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  casteWiseVoter(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterByCaste(this.caste,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      this.VoterwithCaste = data;
      this.totalItems = data[0].totalCount
    })
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

       // data with id
  voterDetails(id: number) {
    this.router.navigate(['/voterdata-management/voter-details', id])
  }

   onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.casteWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByCaste(this.caste, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.VoterwithCaste = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

   keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.casteWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByCaste(this.caste, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.VoterwithCaste = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
   }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterByCaste(this.caste,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.VoterwithCaste = data;
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.VoterwithCaste, 'Castewise Voter');
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

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterByCaste(this.caste,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.VoterwithCaste = data;
        this.totalItems = data[0].totalCount;
        this.csv.exportToCsv(this.VoterwithCaste, 'Castewise Voter');
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

  goBack() {
    this.location.back();
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

}
