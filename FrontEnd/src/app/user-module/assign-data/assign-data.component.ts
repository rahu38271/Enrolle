import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-assign-data',
  templateUrl: './assign-data.component.html',
  styleUrls: ['./assign-data.component.css']
})
export class AssignDataComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  assignPart: any ={};
  id: any;
  allBooths: any[];
  SelectedBooth:any=[];
  Uid: any;

  constructor
    (
      private user: UserService,
      private route:ActivatedRoute
    ) {
    this.user.getBooths().subscribe(data => {
      //console.log(data);
      this.allBooths = data;
    })
  }

  getBoothPart() {
    //debugger;
    this.SelectedBooth = [];
    let checkedStrings = this.allBooths.reduce((acc, eachGroup) => {
      if (eachGroup.checked) {
        var a = eachGroup.id;
        var b = eachGroup.
        this.SelectedBooth.push({a:b});
      }
      
    }, []);
    //console.log(this.SelectedBooth);
  }


  ngOnInit() {
    debugger;
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
   // this.assign();
  }

  assign() {
    this.assignPart.id = Number(this.id);
    this.assignPart.PartNoAssigned = JSON.stringify(this.SelectedBooth);
    this.user.assignPart(this.assignPart).subscribe(data=>{
      //console.log(data);
    })
  }


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'users.xlsx');
  }

}
