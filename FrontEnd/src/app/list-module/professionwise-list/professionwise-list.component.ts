import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professionwise-list',
  templateUrl: './professionwise-list.component.html',
  styleUrls: ['./professionwise-list.component.css']
})
export class ProfessionwiseListComponent implements OnInit {

  isShow = false;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor() { }

  ngOnInit(): void {
  }

}
