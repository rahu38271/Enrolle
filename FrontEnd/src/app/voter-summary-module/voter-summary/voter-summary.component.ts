import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-voter-summary',
  templateUrl: './voter-summary.component.html',
  styleUrls: ['./voter-summary.component.scss'],
})
export class VoterSummaryComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  voterCount: any[]=[];
  userID: any;
  roleID:any;
  assemblyName:any;
  searchWeb:string;
  constructor(public alertController: AlertController, private voter:VoterService, private router:Router) { }

  ngOnInit() { 
    this.userID = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.assemblyName = localStorage.getItem("loginAssembly");
    this.voterByBooth();
  }

  partNo(partNo:any){
    this.router.navigate(['/voterdata-management',{partNo:partNo}])
   }

  voterByBooth(){
    this.voter.boothWiseVoterCount(this.userID,this.roleID).subscribe(data=>{
      this.voterCount = data;
    })
  }

  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table19');
    
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
