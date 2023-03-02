import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService  } from 'src/app/services/voter.service'

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {

  isShow = false;
  voterMobile: any[] = [];
  id: any;
  roleID:any;
  searchMob:string;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor( private router:Router, private voter:VoterService ) {

   }

   voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  ngOnInit(): void {
    this.id = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.mobileList();
    }

  mobileList(){
    this.voter.voterWithMobile(this.id,this.roleID).subscribe(data=>{
      this.voterMobile = data;
    })
  }


  }


