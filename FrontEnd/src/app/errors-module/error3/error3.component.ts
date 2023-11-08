import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error3',
  templateUrl: './error3.component.html',
  styleUrls: ['./error3.component.css']
})
export class Error3Component implements OnInit {

  constructor(
    private router:Router
  ) {
    // setTimeout(()=>{
    //   this.router.navigate(['/'])
    // },3000)
   }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['/'])
  }

}
