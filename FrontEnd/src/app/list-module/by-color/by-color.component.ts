import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-by-color',
  templateUrl: './by-color.component.html',
  styleUrls: ['./by-color.component.css']
})
export class ByColorComponent implements OnInit {
  colorList:any;
  isShow = false;
  userId: any;
  roleID:any;
  searchMob:string;
  supporterVoter:any;
  oppositionVoter:any;
  doubtfulVoter:any;
  otherVoter:any;
  public birthData: Object[];
  public anniData: Object[];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public palette: string[];
  public title: string;
  public chartArea: Object;
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
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
    this.primaryXAxis = {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      valueType: "Category",
      title: 'Colourwise Voter'
    };
    this.primaryYAxis = {
      title: "Count",
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      labelFormat: "{value}"
    };

    this.palette = ["#0067b5", "#00e29c"];
    this.title = 'Colourwise Voter';
    this.chartArea = {
      border: {
        width: 0
      }
    };
  }


  colorWiseVoterList() {
    debugger;
    this.voter.getVoterByColor(this.userId,this.roleID).subscribe(data => {
      this.colorList = data;
      this.supporterVoter = data[0].supporter;
      this.oppositionVoter = data[0].opposition;
      this.doubtfulVoter = data[0].doubtful;
      this.otherVoter = data[0].other;
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
