import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'

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
  roleId:any;

  constructor(
    private voter: VoterService, 
    private router:Router,
    private loader:LoaderService
    ) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.allParts();
   }

   partNo(columnName:any){
    this.router.navigate(['/list/boothwise-list',  {partNumber :columnName} ])
   }

  allParts() {
    this.loader.showLoading();
    this.voter.partNoData({
      TableName: "Tbl_Voter",
      ColumnName: "PartNo",
      UserId : Number(this.id),
      roleID: Number(this.roleId)
    }).subscribe(data => {
      if(data != 0){
        this.loader.hideLoader();
        this.partData = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
