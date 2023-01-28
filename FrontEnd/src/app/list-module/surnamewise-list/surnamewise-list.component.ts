import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'

@Component({
  selector: 'app-surnamewise-list',
  templateUrl: './surnamewise-list.component.html',
  styleUrls: ['./surnamewise-list.component.scss'],
})
export class SurnamewiseListComponent implements OnInit {

  isShow = false;
  lastName: any;
  surnameWiseData = [];
  searchMob:string;
  id: any;

  search() {
    this.isShow = !this.isShow
  }

  constructor(private voter: VoterService, private route: ActivatedRoute, private router:Router) {
    
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.lastName= this.route.snapshot.paramMap.get('lastName')
   // this.route.queryParams.subscribe(params => {
      //this.lastName //= params['lastName'];
      this.voter.voterByLastName(this.lastName,this.id).subscribe(data => {
        this.surnameWiseData = data;
    //  })
    });
  }
}
