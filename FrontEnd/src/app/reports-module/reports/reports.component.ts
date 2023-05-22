import { Component, OnInit  } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  SearchText:any;
  getReports: any;
  totalItems: any;
  
  constructor
  (
    private report:ReportsService
  ) { 
    
  }

  ngOnInit() {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
   if(this.SearchText==undefined){
     this.SearchText = ''
   }
   else{
     this.SearchText = this.SearchText
   }
  }

  ionViewWillEnter(){
    this.allReports(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  allReports(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.report.getReportsList(UserId,RoleId,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.getReports = data
        this.totalItems=data[0].totalCount;
        this.getReports.forEach(e => {
          e.date = e.date.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  event(event:any){
    this.PageNo=event;
    this.allReports(this.UserId,this.RoleId,event,this.NoofRow,this.SearchText);
  }
 
}
