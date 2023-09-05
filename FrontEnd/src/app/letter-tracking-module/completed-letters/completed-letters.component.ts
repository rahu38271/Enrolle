import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-completed-letters',
  templateUrl: './completed-letters.component.html',
  styleUrls: ['./completed-letters.component.css']
})
export class CompletedLettersComponent implements OnInit {

  constructor(
    private location:Location,
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
