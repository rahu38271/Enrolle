import { Component, OnInit } from '@angular/core';
import { VoterService  } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-doubtful-list',
  templateUrl: './doubtful-list.component.html',
  styleUrls: ['./doubtful-list.component.css']
})
export class DoubtfulListComponent implements OnInit {

  userId: any;
  doubtfulVoter: any[]=[];
  searchMob:string;

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId')
    this.doubtfulList();
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  doubtfulList(){
    this.loader.showLoading();
    this.voter.doubtful(this.userId).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.doubtfulVoter = data
      }
    })
  }

}
