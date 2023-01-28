import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-caste-report',
  templateUrl: './caste-report.page.html',
  styleUrls: ['./caste-report.page.scss'],
})
export class CasteReportPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public legendSettings: Object;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = [ '#5e6368','#00bdae', '#F4C430', '#42a1f3', '#055397', '#ff8f1b'];
    args.fill = seriesColor[args.point.index];
};

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { caste: 'Unassigned', count: 25890 }, { caste: 'Baniya', count: 2 },
      { caste: 'Bari', count: 1 }, { caste: 'Buddha', count: 1 },
      { caste: 'Jain', count: 1 },{ caste: 'Maratha', count: 1 },
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
      { 'x': 'Unassigned', y: 25890 }, { 'x': 'Baniya', y: 2 },
      { 'x': 'Bari', y: 1 },{ 'x': 'Buddha', y: 1 }, 
      { 'x': 'Jain', y: 1 },{ 'x': 'Maratha', y: 1 },
    ];

  }

}
