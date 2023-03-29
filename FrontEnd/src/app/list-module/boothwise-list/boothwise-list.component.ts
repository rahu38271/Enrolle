import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-boothwise-list',
  templateUrl: './boothwise-list.component.html',
  styleUrls: ['./boothwise-list.component.scss'],
})
export class BoothwiseListComponent implements OnInit {

  isShow = false;
  partNumber: any;
  partWiseVoter: any[]=[];
  userId:any;
  searchMob:string;
  roleID:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private router:Router, 
    private voter:VoterService, 
    private route:ActivatedRoute,
    private loader:LoaderService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.partNumber = this.route.snapshot.paramMap.get('partNumber');
    this.voter.voterByPart(this.partNumber,this.userId, this.roleID).subscribe(data=>{
      this.partWiseVoter = data;
    })
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

}
