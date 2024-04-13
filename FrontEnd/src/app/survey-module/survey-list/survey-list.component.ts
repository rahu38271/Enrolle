import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { LoaderService } from 'src/app/services/loader.service'
import { SurveyService } from 'src/app/services/survey.service';
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  Language:any;
  isShow = false;
  surveyByVoter: any;
  searchMob: string;
  userId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;
  search(){
    this.isShow = !this.isShow
  }

  constructor
  (
    private loader:LoaderService,
    private survey:SurveyService,
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService
  ) 
  { 
    this.Language = this.translateConfigService.getCurrentLang();
  }

  event(event:any){
    this.PageNo = event;
    this.surveyList(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }


  ngOnInit() {
    this.userId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText=''
    }
    else{
      this.SearchText = this.SearchText.trim();
    }
    this.surveyList(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  

  surveyList(userId:any,RoleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.survey.getAllSurvey(userId,RoleId,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data){
        this.surveyByVoter = data;
        this.totalItems = data[0].totalCount;
      }
      else{

      }
    },(err)=>{

    })
  }

  onSearchChange(SearchText: any): void { 
    this.SearchText = this.SearchText.trim();
    if (this.SearchText == '') {
      this.SearchText = SearchText;
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.surveyList(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    }
    else {
      this.SearchText = SearchText.trim();
      this.PageNo = 1;
      this.NoofRow = 25;
      this.survey.getAllSurvey(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.surveyByVoter = data;
          this.totalItems = data[0].totalCount;
          this.surveyByVoter.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
          });
        }
        else {
          //this.loader.hideLoader();
          this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
        }
      })
    }
  }

  keyPress(SearchText: any){
    if (this.SearchText == '') {
      this.SearchText = SearchText;
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.surveyList(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    }
    else {
      this.SearchText = SearchText.trim();
      this.PageNo = 1;
      this.NoofRow = 25;
      this.survey.getAllSurvey(this.userId,this.RoleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data) {
          //this.loader.hideLoader();
          this.surveyByVoter = data;
          this.totalItems = data[0].totalCount;
          this.surveyByVoter.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
          });
        }
      })
    }
  }

  // survey(data:any){
  //     this.router.navigateByUrl('/survey/edit-survey',{state:data})
  // }

  EditSurvey(data:any){
    this.router.navigateByUrl('/survey/edit-survey', {state:data});
  }

  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  downloadPDF() {
    var element = document.getElementById('surveyTable');
    
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
