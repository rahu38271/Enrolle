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
  Userid: any;
  allBooths: any=[];
  SelectedBooth:any=[];
  UserpartNoAssigned :any; 
  UserpartNoAssignedarray:[];
  SelectedPartNo=[];
  Uid: any;
  id:number;

  constructor
    (
      private user: UserService,
      private route:ActivatedRoute
    ){}
  
  ngOnInit() {
    this.SelectedPartNo=[];
    this.user.getBooths().subscribe(data => {
      //console.log(data);
      this.allBooths = data;
      this.allBooths.reduce((acc, allboothitem) => 
      {
        debugger;
        for(let item in this.UserpartNoAssignedarray)
        {
            if(allboothitem.partNo==Number(this.UserpartNoAssignedarray[item])){
              allboothitem.checked=true;
              this.SelectedPartNo.push(allboothitem.partNo);
              //item.checked=true;
            }
      }
    }, []);
    });
    debugger;
    this.Userid = this.route.snapshot.paramMap.get('id');
    this.UserpartNoAssigned=this.route.snapshot.paramMap.get('partNoAssigned');
    this.UserpartNoAssignedarray=this.UserpartNoAssigned.split(',');
    //for(let allBooths of this.allBooths )
    
    //this.UserpartNoAssigned.reduce(item)
   // this.SelectedPartNo=
    //console.log(this.Userid);
   // this.assign();
  }

  getBoothPart(event:any) {
    debugger;
    this.SelectedBooth = [];
   // this.SelectedPartNo=[];
    debugger;
     if(event.target.checked){
       var a=Number(event.target.value);
       this.SelectedPartNo.push(a);
     }
     else {
      const index=this.SelectedPartNo.indexOf(Number(event.target.value));
      if(index > -1)
      {
        this.SelectedPartNo.splice(index,1);
      }
     }
    // let checkedStrings = this.allBooths.reduce((acc, item) => {
    //   if (item.checked) {
    //     this.SelectedPartNo.push(item.partNo);
    //   }
      
    // }, []);
    
    
    console.log("data", this.SelectedPartNo.toString());
    console.log(this.SelectedPartNo);
  }


 
  assign() {
   this.id=Number(this.Userid);
      this.user.assignPart({
        UserId:this.id,
        PartNoAssigned:this.SelectedPartNo.toString()
      }).subscribe(data=>{
        if(data==1){
          console.log("sucess");
          //redirect to the User page 
          //shows the alert 
          //edit the response from api --string like "Record added succesfully " -
        }
      console.log(data);
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
