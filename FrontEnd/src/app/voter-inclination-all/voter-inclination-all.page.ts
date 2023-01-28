import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-voter-inclination-all',
  templateUrl: './voter-inclination-all.page.html',
  styleUrls: ['./voter-inclination-all.page.scss'],
})
export class VoterInclinationAllPage implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public pointClick(args: IPointEventArgs): void {
        document.getElementById("lbl").innerText = "X : "+ args.point.x + "\nY : "+ args.point.y;
      };

constructor() {
   
}

ngOnInit() {
  
      this.datalabel = { visible: true };
      this.tooltip = {enable: true};
      this.title = 'Voter Inclination All Summary';
      this.piedata = [
                 { 'x': 'In Favor', y: 1 }, { 'x': 'Neutral	', y: 1 },
                  { 'x': 'Opponent', y: 1 },
                  { 'x': 'Supporter', y: 2 },
                  { 'x': 'Unassigned', y: 25891 }
              ];
      
}

}
