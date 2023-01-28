import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addresswise-list',
  templateUrl: './addresswise-list.component.html',
  styleUrls: ['./addresswise-list.component.scss'],
})
export class AddresswiseListComponent implements OnInit {

  isShow = false;
  addressName: any;
  coloumnName: any;
  addressWiseList: any[]=[];
  searchMob:string;
  userId:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(private voter:VoterService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.addressName= this.route.snapshot.paramMap.get('addressName')
    this.voter.voterByAddress(this.addressName,this.userId).subscribe(data=>{
      this.addressWiseList = data;
    })
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

}
