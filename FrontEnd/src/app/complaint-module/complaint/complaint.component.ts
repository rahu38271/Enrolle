import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
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

  complaintCount: any;
  totalComplaints: any;
  todaysComplaints: any;
  resolvedComplaints: any;
  pendingComplaints: any;
  UserId:any;
  RoleId:any;

  constructor(
    private complaint: ComplaintService,
  ) { }

  ngOnInit(): void {
    this.UserId = Number(localStorage.getItem("loginId"));
    this.RoleId = Number(localStorage.getItem("userType"))
  }

  ionViewWillEnter() {
    this.allComplaintCount();
  }



  allComplaintCount() {
    this.complaint.getComplaintCount(this.UserId,this.RoleId).subscribe(data => {
      this.complaintCount = data;
      this.totalComplaints = data[0].totalCount;
      this.todaysComplaints = data[0].todayCount;
      this.resolvedComplaints = data[0].resolved;
      this.pendingComplaints = data[0].pending;

      this.datalabel = { visible: true };
      this.tooltip = { enable: true };
      this.title = 'Complaint Book';
      this.palette1 = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
      this.complaintCount = [
        { 'x': 'All', y: this.totalComplaints }, { 'x': 'Today', y: this.todaysComplaints },
        { 'x': 'Resolved', y: this.resolvedComplaints }, { 'x': 'Pending', y: this.pendingComplaints }
      ];
    })
  }
}



