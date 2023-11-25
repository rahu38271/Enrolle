import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error3',
  templateUrl: './error3.component.html',
  styleUrls: ['./error3.component.css']
})
export class Error3Component implements OnInit {

  UserId:any;
  roleId:any;

  constructor(
    private router:Router
  ) {
    
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.roleId = localStorage.getItem('userType');
    if(this.roleId==1){

    }else{
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },1000)
    }
  }

  goHome(){
    this.router.navigate(['/login'])
  }

}
