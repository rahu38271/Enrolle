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
  oppositeVoter: any[]=[];
  searchMob: string;

  constructor(
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.opposite();
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  opposite(){
    this.loader.showLoading();
    this.voter.opposition(this.userId).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.oppositeVoter = data;
      }
    })
  }

}
