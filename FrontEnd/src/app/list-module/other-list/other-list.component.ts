import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.css']
})
export class OtherListComponent implements OnInit {

  userId: any;
  otherVoter: any[]=[];

  constructor(
    private router:Router,
    private voter:VoterService,
    private loader:LoaderService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.otherList();
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  otherList(){
    this.loader.showLoading();
    this.voter.other(this.userId).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.otherVoter = data;
      }
      
    })
  }

}
