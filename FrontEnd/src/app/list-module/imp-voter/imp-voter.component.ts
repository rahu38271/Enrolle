import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'

@Component({
  selector: 'app-imp-voter',
  templateUrl: './imp-voter.component.html',
  styleUrls: ['./imp-voter.component.css']
})
export class ImpVoterComponent implements OnInit {

  isShow = false;
  impVoterData: any[] = [];
  userId: any;
  roleID:any;
  searchMob:string;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor( private router:Router, private voter:VoterService, private loader:LoaderService ) {

   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.impVoterList();
    }

    voterDetails(id:number){
      this.router.navigate(['voterdata-management/voter-details', id])
     }

  impVoterList(){
    this.loader.showLoading();
    this.voter.impVoter(this.userId, this.roleID).subscribe(data=>{
      this.loader.hideLoader();
      this.impVoterData = data;
    })
  }

}
