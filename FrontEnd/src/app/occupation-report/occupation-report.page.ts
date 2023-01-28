import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-occupation-report',
  templateUrl: './occupation-report.page.html',
  styleUrls: ['./occupation-report.page.scss'],
})
export class OccupationReportPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public legendSettings: Object;
  public title: String;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = [ '#5e6368','#00bdae', '#F4C430', '#42a1f3', '#ff8f1b', '#055397', '#0F0'];
    args.fill = seriesColor[args.point.index];
};

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { occupation: 'Unassigned', count: 25891 }, { occupation: 'Business', count: 1 },
      { occupation: 'Engineer', count: 1 }, { occupation: 'Housewife', count: 1 },
      { occupation: 'Other', count: 1 }, { occupation: 'Social Worker', count: 1 },
    ];
    this.primaryXAxis = {
      valueType: 'Category'
    };

    this.legendSettings = {
      visible: true
  };

    this.datalabel = { visible: true };
    this.tooltip = { enable: true };
    this.title = 'Occupation Summary';
    this.piedata = [
      { 'x': 'Unassigned', y: 25891 }, { 'x': 'Business', y: 1 },
      { 'x': 'Engineer', y: 1 }, { 'x': 'Housewife', y: 1 },
      { 'x': 'Other', y: 1 }, { 'x': 'Social Worker', y: 1 },
    ];

  }

}
