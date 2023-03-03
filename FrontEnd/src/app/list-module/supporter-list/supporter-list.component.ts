import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { VoterService } from 'src/app/services/voter.service'

@Component({
  selector: 'app-supporter-list',
  templateUrl: './supporter-list.component.html',
  styleUrls: ['./supporter-list.component.css']
})
export class SupporterListComponent implements OnInit {

  userId:any;
  roleID:any;
  supportVoter: any[] = [];

  constructor(
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    this.supporterList();
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  supporterList(){
    this.loader.showLoading();
    this.voter.supporter(this.userId,this.roleID).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.supportVoter = data;
      }
    })
  }
}
