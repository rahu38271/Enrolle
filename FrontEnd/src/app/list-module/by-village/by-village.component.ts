import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-by-village',
  templateUrl: './by-village.component.html',
  styleUrls: ['./by-village.component.scss'],
})
export class ByVillageComponent implements OnInit {

  isShow = false;
  vilModal: any;
  searchMob:string;
  id:any

  constructor(private voter: VoterService, private router:Router) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.allVillages();
  }

  villageName(columnName:any){
    this.router.navigate(['/list/villagewise-list',  {villageName :columnName} ])
   }

  allVillages() {
    this.voter.villagedata({
      TableName: "Tbl_Voter",
      ColumnName: "Village",
      UserId : Number(this.id)
    }).subscribe(data => {
      this.vilModal = data;
    })
  }

}
