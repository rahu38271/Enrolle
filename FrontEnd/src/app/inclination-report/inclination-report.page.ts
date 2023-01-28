import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-inclination-report',
  templateUrl: './inclination-report.page.html',
  styleUrls: ['./inclination-report.page.scss'],
})
export class InclinationReportPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public legendSettings: Object;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369', '#29dd52'];
    args.fill = seriesColor[args.point.index];
};

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { month: 'Unassigned', count: 2 }, { month: 'In Favor', count: 1 },
      { month: 'Neutral', count: 1 }, { month: 'Opponent', count: 1 },
      { month: 'Supporter', count: 2 },
    ];
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.legendSettings = {
      visible: true
  };

    this.datalabel = { visible: true };
    this.tooltip = { enable: true };
    this.title = 'Inclination Summary';
    this.piedata = [
      { 'x': 'Unassigned', y: 25891 }, { 'x': 'In Favor', y: 1 },
      { 'x': 'Neutral', y: 1 },
      { 'x': 'Opponent', y: 1 }, { 'x': 'Supporter', y: 2 },
    ];

  }

}
