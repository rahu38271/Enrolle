import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-by-address',
  templateUrl: './by-address.component.html',
  styleUrls: ['./by-address.component.scss'],
})
export class ByAddressComponent implements OnInit {

  isShow = false;
  adrsData: any;
  searchMob:string;
  id:any

  constructor(private voter:VoterService, private router:Router) { }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.addressData();
  }

  search(){
    this.isShow = !this.isShow
  }
 

  address(columnName:any){
    this.router.navigate(['/list/addresswise-list',  {addressName :columnName} ])
   }

  addressData(){
    this.voter.addressData({
      TableName: "Tbl_Voter",
      ColumnName: "Address",
      UserId : Number(this.id)
    }).subscribe(data=>{
      this.adrsData = data;
    })
  }

}
