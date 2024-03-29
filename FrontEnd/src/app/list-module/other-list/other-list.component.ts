import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.css']
})
export class OtherListComponent implements OnInit {
  
  Language:any;
  userId: any;
  roleID:any;
  otherVoter: any;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  SearchMob:string;
  totalItems:any;
  SearchText:any;
  

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

  ngOnInit(): void {
    
    
  }

  ionViewWillEnter(){
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.otherList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  event(event:any){
    this.PageNo = event;
    this.otherList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

    // data with id
  voterDetails(id: number) {
    this.router.navigate(['/voterdata-management/voter-details', id])
  }

   EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  otherList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    // if(SearchText==""){
    //   this.loader.showLoading();
    // }
    // else{
    //   this.loader.hideLoader();
    // }
    //this.loader.showLoading();
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
    this.voter.other(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
       //this.loader.hideLoader();
        this.otherVoter = data;
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

  search(){
    this.isShow = !this.isShow
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.otherList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.other(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.otherVoter = data;
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
    this.voter.other(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.otherVoter = data;
        this.totalItems = data[0].totalCount;
        this.otherVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
        })
        this.excel.exportAsExcelFile(this.otherVoter, 'Other Voter');
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
    this.voter.other(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.otherVoter = data;
        this.totalItems = data[0].totalCount;
        this.otherVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
          delete e.id;
        })
        this.csv.exportToCsv(this.otherVoter, 'Other Voter');
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
