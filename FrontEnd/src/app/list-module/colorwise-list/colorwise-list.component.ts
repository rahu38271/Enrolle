import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Route, Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-colorwise-list',
  templateUrl: './colorwise-list.component.html',
  styleUrls: ['./colorwise-list.component.css']
})
export class ColorwiseListComponent implements OnInit {

  id:any;
  colorWiseVoter: any[]=[];
  inclination: any;

  constructor(private voter:VoterService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loginId");
    this.colorVoterList();
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  colorVoterList(){
    this.voter.colorWiseVoterList(this.inclination, this.id).subscribe(data=>{
      console.log(data);
      this.colorWiseVoter = data;
    })
  }

}
