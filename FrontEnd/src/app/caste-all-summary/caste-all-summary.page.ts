import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-caste-all-summary',
  templateUrl: './caste-all-summary.page.html',
  styleUrls: ['./caste-all-summary.page.scss'],
})
export class CasteAllSummaryPage implements OnInit {

  public primaryXAxis: Object;
    public chartData: Object[];
    public piedata: Object[];
    public datalabel: Object;
    public tooltip: Object;
    public title: String;
    public legendSettings: Object;
    public pointClick(args: IPointEventArgs): void {
          document.getElementById("lbl").innerText = "X : "+ args.point.x + "\nY : "+ args.point.y;
        };
 
  constructor() {
     
  }

  ngOnInit() {
    this.legendSettings = { visible: true };
        this.datalabel = { visible: true };
        this.tooltip = {enable: true};
        this.title = 'Caste Summary';
        this.piedata = [
                   { 'x': 'Baniya', y: 2 }, { 'x': 'Bari', y: 1 },
                    { 'x': 'Buddha', y: 1 },
                    { 'x': 'Jain', y: 1 }, { 'x': 'Maratha', y: 1 },
                    { 'x': 'Unassigned', y: 25890 }
                ];
        
        
  }

}
