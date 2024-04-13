import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error2',
  templateUrl: './error2.component.html',
  styleUrls: ['./error2.component.css']
})
export class Error2Component implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['/home/mobile-dashboard'])
  }

}
