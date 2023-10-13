import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { LetterService } from 'src/app/services/letter.service';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-letter-tracking',
  templateUrl: './letter-tracking.component.html',
  styleUrls: ['./letter-tracking.component.css']
})
export class LetterTrackingComponent implements OnInit {
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

  UserId: any;
  RoleId: any;
  allCount: any;
  totalLetters: any;
  todayLetters: any;
  compLetters: any;
  pendLetters: any;

  constructor(
    public alertController: AlertController,
    private letterService: LetterService
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    
  }

  ionViewWillEnter(){
    this.dashboardCount();
  }

  dashboardCount() {
    this.letterService.getDashboardCount(this.UserId, this.RoleId).subscribe(data => {
      if (data) {
        this.allCount = data;
        console.log(data);
        this.totalLetters = data[0].totalCount;
        this.todayLetters = data[0].todayCount;
        this.compLetters = data[0].completed;
        this.pendLetters = data[0].pending;

        this.datalabel = { visible: true };
        this.tooltip = { enable: true };
        this.title = 'Complaint Book';
        this.palette1 = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
        this.allCount = [
          { 'x': 'All', y: this.totalLetters }, { 'x': 'Today', y: this.todayLetters },
          { 'x': 'Completed', y: this.compLetters }, { 'x': 'Pending', y: this.pendLetters }
        ];
      }
    })
  }

}
