import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-assign-data',
  templateUrl: './assign-data.component.html',
  styleUrls: ['./assign-data.component.css']
})
export class AssignDataComponent implements OnInit {

  disabled:boolean= false;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  assignPart: any = {};
  Userid: any;
  allBooths: any[] = [];
  SelectedBooth: any = [];
  UserpartNoAssigned: any;
  UserpartNoAssignedarray: [];
  SelectedPartNo = [];
  Uid: any;
  id: number;
  cp: number = 1;
  alreadyAssignedPart:any={};
  searchWeb:string;
  constructor
    (
      private user: UserService,
      private route: ActivatedRoute,
      private toast: IonicToastService,
      private loader: LoaderService,
      private router: Router
    ) { }

  ngOnInit() {
    
    this.SelectedPartNo = [];
    this.user.getBooths().subscribe(data => {
      //console.log(data);
      this.allBooths = data;
      this.allBooths.forEach(booth => {
        this.UserpartNoAssignedarray.forEach(item=>{
          if (booth.partNo == Number(item)) {
             booth.checked = true; 
             this.SelectedPartNo.push(booth.partNo);
          }
        })
      //   this.user.getAllAssignedPart().subscribe(data=>{
      //     var Dispart = data.split(',');
      //  // if(!element.checked){}
      //   Dispart.forEach(el => {
      //     if(el ==booth.partNo )
      //     {
      //       booth.disable = true;
      //     }
      //   });
      //   });
       });
     
    });
    debugger;
    this.Userid = this.route.snapshot.paramMap.get('id');
    this.UserpartNoAssigned = this.route.snapshot.paramMap.get('partNoAssigned');
    this.UserpartNoAssignedarray = this.UserpartNoAssigned.split(',');
    
  
    //for(let allBooths of this.allBooths )

    //this.UserpartNoAssigned.reduce(item)
    // this.SelectedPartNo=
    //console.log(this.Userid);
    // this.assign();
  }

  getBoothPart(event: any) {
    debugger;
    this.SelectedBooth = [];
    // this.SelectedPartNo=[];
    
    if (event.target.checked) {
      var a = Number(event.target.value);
      this.SelectedPartNo.push(a);
      
    }
    else {
      const index = this.SelectedPartNo.indexOf(Number(event.target.value));
      
      if (index > -1) {
        this.SelectedPartNo.splice(index, 1);
        
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

  editPartyRolesSubmit(){

  }

  allAssignedPart(){
    this.user.getAllAssignedPart().subscribe(data=>{
      this.alreadyAssignedPart = data;
      //this.disabled = true;
      
      if(this.alreadyAssignedPart){
        this.disabled = true;
      }
    })
  }

  assign() {
    this.loader.showLoading();
    this.id = Number(this.Userid);
    this.user.assignPart({
      UserId: this.id,
      PartNoAssigned: this.SelectedPartNo.toString()
    }).subscribe(data => {
      if (data == 1) {
        this.loader.hideLoader();
        console.log("sucess");
        this.router.navigate(['/user']);
        this.toast.presentToast("Part no. assigned successfully!", "success", 'checkmark-circle-sharp');
        //edit the response from api --string like "Record added succesfully "
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Part no. not assigned", "danger", 'alert-circle-sharp');
      }
      console.log(data);
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("User not saved", "danger", 'alert-circle-sharp');
    })
  }

}
