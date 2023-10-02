import { Component, OnInit } from '@angular/core'
import { VoterService } from 'src/app/services/voter.service';
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addresswise-list',
  templateUrl: './addresswise-list.component.html',
  styleUrls: ['./addresswise-list.component.scss'],
})
export class AddresswiseListComponent implements OnInit {
  id:any;
  Language:any;
  isShow = false;
  addressName: any;
  coloumnName: any;
  addressWiseList: any;
  searchMob:string;
  userId:any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
      private voter:VoterService, 
      private router:Router, 
      private route:ActivatedRoute,
      private toast:IonicToastService,
      private loader:LoaderService,
      private excel:ExcelService,
      private csv:CsvService,
      private location:Location,
      private translateConfigService: TranslateConfigService,
      ) {
        this.Language = this.translateConfigService.getCurrentLang();
       }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.addressName= this.route.snapshot.paramMap.get('addressName');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.addressWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText) 

  }

  event(event:any){
    this.PageNo = event;
    this.addressWiseVoterData(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }



  addressWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterByAddress(this.addressName,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.addressWiseList = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{

    })
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

  onSearchText(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.addressWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByAddress(this.addressName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.addressWiseList = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

  keyPress(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.addressWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterByAddress(this.addressName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.addressWiseList = data;
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
    this.voter.voterByAddress(this.addressName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.addressWiseList = data;
        this.totalItems = data[0].totalCount;
        this.addressWiseList.forEach(e => {
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
          delete e.id;
        });
        this.excel.exportAsExcelFile(this.addressWiseList, 'Addresswise Voter');
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
    this.voter.voterByAddress(this.addressName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.addressWiseList = data;
        this.totalItems = data[0].totalCount;
        this.addressWiseList.forEach(e => {
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
          delete e.id;
        });
        this.csv.exportToCsv(this.addressWiseList, 'Addresswise Voter');
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

}
