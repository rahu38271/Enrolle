import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { LoaderService } from 'src/app/services/loader.service'
import { VoterService} from 'src/app/services/voter.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  isShow = false;
  allVoters: any;
  searchMob: string;

  search(){
    this.isShow = !this.isShow
  }

  constructor
  (
    private loader:LoaderService,
    private voter:VoterService,
    private router:Router
  ) 
  { }

  voterList(){
    this.voter.getAllVoter().subscribe(data=>{
      console.log(data);
      this.allVoters = data;
    })
  }

  ngOnInit() {
    this.voterList();
  }

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
