import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-surnamewise-list',
  templateUrl: './surnamewise-list.component.html',
  styleUrls: ['./surnamewise-list.component.scss'],
})
export class SurnamewiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  lastName: any;
  surnameWiseData : any;
  searchMob:string;
  userId: any;
  roleID:any;
  id:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;


  search() {
    this.isShow = !this.isShow
  }

  constructor(
    private voter: VoterService, 
    private route: ActivatedRoute, 
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private excel:ExcelService,
      private csv:CsvService,
      private location:Location
    ) {
    this.Language = this.translateConfigService.getCurrentLang();
  }

  event(event:any){
    this.PageNo = event;
    this.lastNameWiseVoterData(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.lastName = this.route.snapshot.paramMap.get('lastName')
    // this.route.queryParams.subscribe(params => {
    //this.lastName //= params['lastName'];
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    this.lastNameWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language,this.SearchText);
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

       // data with id
  voterDetails(data) {
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }


  lastNameWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.Language = this.translateConfigService.getCurrentLang();
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
    this.voter.voterByLastName(this.lastName,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data => {
      if(data.length != 0){
        this.surnameWiseData = data;
        this.totalItems = data[0].totalCount
      }
      else{

      }
  },(err)=>{

  });
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.lastNameWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByLastName(this.lastName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.surnameWiseData = data;
          this.totalItems = data[0].totalCount
        }
      });
    }
  }

   keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.lastNameWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByLastName(this.lastName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.surnameWiseData = data;
          this.totalItems = data[0].totalCount
        }
      });
    }
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterByLastName(this.lastName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.surnameWiseData = data;
        this.totalItems = data[0].totalCount;
        this.surnameWiseData.forEach(e => {
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
        });
        this.excel.exportAsExcelFile(this.surnameWiseData, 'surnameWise Voter');
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
    this.voter.voterByLastName(this.lastName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.surnameWiseData = data;
        this.totalItems = data[0].totalCount;
        this.surnameWiseData.forEach(e => {
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
          delete e.id;
        });
        this.csv.exportToCsv(this.surnameWiseData, 'surnameWise Voter');
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

  goBack(){
    this.location.back();
  }
}
