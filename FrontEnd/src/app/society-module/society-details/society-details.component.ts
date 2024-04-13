import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-society-details',
  templateUrl: './society-details.component.html',
  styleUrls: ['./society-details.component.css']
})
export class SocietyDetailsComponent implements OnInit {

  society:any;
 
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.society = this.router.getCurrentNavigation().extras.state;
    this.societyDetails();
  }

  societyDetails(){
    this.societyDetails = this.society
  }

}
