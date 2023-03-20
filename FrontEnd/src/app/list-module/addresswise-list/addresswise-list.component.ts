import { Component, OnInit } from '@angular/core'
import { VoterService } from 'src/app/services/voter.service';
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'

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
  roleID:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
      private voter:VoterService, 
      private router:Router, 
      private route:ActivatedRoute,
      private toast:IonicToastService,
      private loader:LoaderService 
      ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.addressName= this.route.snapshot.paramMap.get('addressName')
    this.voter.voterByAddress(this.addressName,this.userId, this.roleID).subscribe(data=>{
      this.addressWiseList = data;
    })
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

}
