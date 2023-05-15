import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  complaintCount:any;

  constructor(
    private complaint:ComplaintService,
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter(){
    this.allComplaintCount();
  }

  allComplaintCount(){
    this.complaint.getComplaintCount().subscribe(data=>{
      this.complaintCount = data;
    })
  }


}
