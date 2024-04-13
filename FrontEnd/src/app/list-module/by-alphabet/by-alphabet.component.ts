import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-alphabet',
  templateUrl: './by-alphabet.component.html',
  styleUrls: ['./by-alphabet.component.scss'],
})
export class ByAlphabetComponent implements OnInit {

  isShow = false;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor() { }

  ngOnInit() {}

}
