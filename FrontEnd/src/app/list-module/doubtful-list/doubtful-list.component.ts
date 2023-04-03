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
  roleID:any;
  doubtfulVoter: any[]=[];
  searchMob:string;

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    this.doubtfulList();
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  doubtfulList(){
    this.loader.showLoading();
    this.voter.doubtful(this.userId,this.roleID).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.doubtfulVoter = data
      }
    })
  }

}
