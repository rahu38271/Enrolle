import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { VoterService } from 'src/app/services/voter.service'

@Component({
  selector: 'app-opposition-list',
  templateUrl: './opposition-list.component.html',
  styleUrls: ['./opposition-list.component.css']
})
export class OppositionListComponent implements OnInit {

  userId: any;
  roleID:any;
  oppositeVoter: any[]=[];
  searchMob: string;
  isShow = false;

  constructor(
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType')
    this.opposite();
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  opposite(){
    this.loader.showLoading();
    this.voter.opposition(this.userId,this.roleID).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.oppositeVoter = data;
      }
    })
  }

  search(){
    this.isShow = !this.isShow
  }

}
