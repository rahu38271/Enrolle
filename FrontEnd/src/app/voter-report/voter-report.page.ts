import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs, IPointEventArgs,IPointRenderEventArgs  } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-voter-report',
  templateUrl: './voter-report.page.html',
  styleUrls: ['./voter-report.page.scss'],
})
export class VoterReportPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public legendSettings: Object;
  
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = [ '#5e6368','#00bdae', '#F4C430', '#42a1f3', '#ff8f1b', '#055397', '#0F0','#F00','#00F', '#ccc'];
    args.fill = seriesColor[args.point.index];
};

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { voter: 'Total Voters', count: 25896 }, { voter: 'Matched Mobile Voters', count: 13082 },
      { voter: 'Male', count: 13784 }, { voter: 'Female', count: 12112 },
      { voter: 'Survey Done', count: 7 }, { voter: 'Suspicious', count: 0 },
      { voter: 'Out Side Taluka', count: 1 }, { voter: 'Family Count', count: 205 },
      { voter: 'Voter Assign To Family', count: 975 }, { voter: 'Non Family Voters', count: 24921 },
    ];
    this.primaryXAxis = {
      valueType: 'Category'
    };

    this.legendSettings = { visible: true };
    this.datalabel = { visible: true };
    this.tooltip = { enable: true };
    this.title = 'Voter Summary';
    this.piedata = [
      { 'x': 'Total Voters', y: 25896 }, { 'x': 'Matched Mobile Voters', y: 13082 },
      { 'x': 'Male', y: 13784 }, { 'x': 'Female', y: 12112 },
      { 'x': 'Survey Done', y: 7 }, { 'x': 'Suspicious', y: 0 },
      { 'x': 'Out Side Taluka', y: 1 }, { 'x': 'Family Count', y: 205 },
      { 'x': 'Voter Assign To Family', y: 975 }, { 'x': 'Non Family Voters', y: 24921 },
    ];

  }

}
