import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pincodewise-list',
  templateUrl: './pincodewise-list.component.html',
  styleUrls: ['./pincodewise-list.component.css']
})
export class PincodewiseListComponent implements OnInit {

  isShow = false;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor() {

   }
  ngOnInit(): void {
    
  }

}
