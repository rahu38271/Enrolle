import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error1',
  templateUrl: './error1.component.html',
  styleUrls: ['./error1.component.css']
})
export class Error1Component implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['/home/mobile-dashboard'])
  }

}
