import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-by-booth',
  templateUrl: './by-booth.component.html',
  styleUrls: ['./by-booth.component.scss'],
})
export class ByBoothComponent implements OnInit {

  isShow = false;
  partData: any;
  searchMob:string;
  id:any;

  constructor(private voter: VoterService, private router:Router) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.allParts();
   }

   partNo(columnName:any){
    this.router.navigate(['/list/boothwise-list',  {partNumber :columnName} ])
   }

  allParts() {
    this.voter.partNoData({
      TableName: "Tbl_Voter",
      ColumnName: "PartNo",
      UserId : Number(this.id)
    }).subscribe(data => {
      this.partData = data;
    })
  }

}
