import { Component, OnInit } from '@angular/core';
import {VoterService } from 'src/app/services/voter.service'
import { Route, Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-villagewise-list',
  templateUrl: './villagewise-list.component.html',
  styleUrls: ['./villagewise-list.component.scss'],
})
export class VillagewiseListComponent implements OnInit {

  isShow = false;
  villageName: any;
  villageWiseVoter: any[] = [];
  //villageWiseVoter: any = {};
  searchMob:string;
  userId: any;
  roleID:any;
  id:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(private voter:VoterService, private route:ActivatedRoute, private router:Router ) {

   }

   voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.id = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.villageName = this.route.snapshot.paramMap.get('villageName');
    //this.village = this.route.snapshot.paramMap.get('village');
    this.voter.voterByVillage(this.villageName,this.userId, this.roleID).subscribe(data=>{
      this.villageWiseVoter = data;
    })
  }

}




