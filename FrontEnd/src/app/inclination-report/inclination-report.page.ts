import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-inclination-report',
  templateUrl: './inclination-report.page.html',
  styleUrls: ['./inclination-report.page.scss'],
})
export class InclinationReportPage implements OnInit {

  colorList:any;
  isShow = false;
  userId: any;
  roleID:any;
  searchMob:string;
  supporterVoter:any;
  oppositionVoter:any;
  doubtfulVoter:any;
  otherVoter:any;
  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public palette1: string[];
  public legendSettings: Object;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369', '#29dd52'];
    args.fill = seriesColor[args.point.index];
};

  constructor(
    private voter: VoterService, 
    private router: Router,
    private location:Location
    ) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    debugger;
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.colorWiseVoterList();
    // this.primaryXAxis = {
    //   majorGridLines: { width: 0 },
    //   minorGridLines: { width: 0 },
    //   majorTickLines: { width: 0 },
    //   minorTickLines: { width: 0 },
    //   interval: 1,
    //   lineStyle: { width: 0 },
    //   valueType: "Category",
    //   title: 'Colourwise Voter'
    // };
  }


  colorWiseVoterList() {
    this.voter.getVoterByColor(this.userId,this.roleID).subscribe(data => {
      this.colorList = data;
      console.log(data);
      this.supporterVoter = data[0].supporter;
      this.oppositionVoter = data[0].opposition;
      this.doubtfulVoter = data[0].doubtful;
      this.otherVoter = data[0].other;
      
    this.datalabel = { visible: true };
    this.tooltip = { enable: true };
    this.title = 'Colourwise summary';
    this.palette1 = ["#0bbb5f", "#f00", "#ffd34f","#ccc"]
    this.colorList = [
       { 'x': 'Supporter', y: this.supporterVoter },{ 'x': 'Opponent', y: this.oppositionVoter },
       { 'x': 'Doubtful', y: this.doubtfulVoter }, { 'x': 'Other', y: this.otherVoter }
    ];
    })
  }

  supporter(){
    this.router.navigate(['/list/supporter']);
  }

  opposition(){
    this.router.navigate(['/list/opposition']);
  }

  doubtful(){
    this.router.navigate(['/list/doubtful']);
  }

  other(){
    this.router.navigate(['/list/other']);
  }

  goBack(){
    this.location.back();
  }

}
