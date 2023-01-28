import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-political-party-report',
  templateUrl: './political-party-report.page.html',
  styleUrls: ['./political-party-report.page.scss'],
})
export class PoliticalPartyReportPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public legendSettings: Object;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = [ '#5e6368','#00bdae', '#F4C430', '#42a1f3', '#ff8f1b', '#055397', '#0F0'];
    args.fill = seriesColor[args.point.index];
};

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { party: 'Unassigned', count: 25891 }, { party: 'BJP', count: 3 },
      { party: 'Congress', count: 1 },{ party: 'NCP', count: 1 },
      { party: 'Shivsena', count: 1 },{ party: 'MNS', count: 1 },
       { party: 'Other', count: 1 },
    ];
    this.primaryXAxis = {
      valueType: 'Category'
    };

    this.legendSettings = {
      visible: true
  };

    this.datalabel = { visible: true };
    this.tooltip = { enable: true };
    this.title = 'Political Party Summary';
    this.piedata = [
      { 'x': 'Unassigned', y: 25891 }, { 'x': 'BJP', y: 3 },
      { 'x': 'NCP', y: 1 }, { 'x': 'Other', y: 1 },
    ];

  }

}
