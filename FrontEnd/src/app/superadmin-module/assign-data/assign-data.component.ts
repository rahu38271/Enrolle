import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { SuperadminService } from 'src/app/services/superadmin.service'

@Component({
  selector: 'app-assign-data',
  templateUrl: './assign-data.component.html',
  styleUrls: ['./assign-data.component.css']
})
export class AssignDataComponent implements OnInit {

  disabled: boolean = false;

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
  alreadyAssignedPart: any = {};
  superadminId: any;
  constructor
    (
      private route: ActivatedRoute,
      private toast: IonicToastService,
      private loader: LoaderService,
      private router: Router,
      private sadmin: SuperadminService
    ) { }

  ngOnInit() {
    var userrole  = localStorage.getItem("userType")
    this.SelectedPartNo = [];
    this.sadmin.getBooths().subscribe(data => {
      //console.log(data);
      this.allBooths = data;
      this.allBooths = data;
      this.allBooths.forEach(booth => {

      var index  = this.UserpartNoAssignedarray.findIndex(x=>x == booth.partNo);
          if ( index == -1)
          {
            booth.checked = false; 
          }
          else
          {
            booth.checked = true; 
            this.SelectedPartNo.push(booth.partNo);
          }
          if(userrole == '3')
          {
          this.sadmin.GetPartNoAssignedOtherthanThisuser(this.Userid).subscribe(notassigned=>{
            if(notassigned)
            {
              debugger
              var arr1  = notassigned.partNo.split(',');
              var index3  = arr1.findIndex(x=>x == booth.partNo);
              if(index3 == -1 )
              {
                booth.hide = false;
              }
              else
              {
                booth.hide = true; 
              }
            }
          });
        }
          this.sadmin.getAssignedPartByUser(this.Userid).subscribe(data=>{
              if(data)
              {
              var arr  = data.partNo.split(',');
              var index2  = arr.findIndex(x=>x == booth.partNo);
              if(index2 == -1 )
              {
                booth.disable = false;
              }
              else if(!booth.checked)
              {
                booth.disable = true; 
              }
            }
          });
      });
      // this.allBooths.reduce((acc, allboothitem) => {
      //   debugger;
      //   for (let item in this.UserpartNoAssignedarray) {
      //     if (allboothitem.partNo == Number(this.UserpartNoAssignedarray[item])) {
      //       allboothitem.checked = true;

      //       debugger;
      //       this.SelectedPartNo.push(allboothitem.partNo);

      //       //item.checked=true;

      //     }
      //     else {
      //       allboothitem.checked = false;
      //     }
      //     this.allBooths.forEach(element => {
      //       this.sadmin.getAllAssignedPart().subscribe(data => {

      //         var Dispart = data.split(',');

      //         if (!element.checked)
      //           Dispart.forEach(el => {
      //             debugger;
      //             if (el == element.partNo) {
      //               element.disable = true;
      //             }
      //             else {
      //               element.disable = false;
      //             }

      //           });

      //       });

      //     });
      //   }
      // }, []);
    });
 
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

  allAssignedPart() {
    this.sadmin.getAllAssignedPart().subscribe(data => {
      this.alreadyAssignedPart = data;
      //this.disabled = true;

      if (this.alreadyAssignedPart) {
        this.disabled = true;
      }
    })
  }

  assign() {
    debugger;
    this.loader.showLoading();
    this.id = Number(this.Userid);
    this.sadmin.assignPart({
      UserId: this.id,
      PartNoAssigned: this.SelectedPartNo.toString()
    }).subscribe(data => {
      if (data == 1) {
        this.loader.hideLoader();
        console.log("sucess");
        this.router.navigate(['/superadmin']);
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
      //this.toast.presentToast("User not saved", "danger", 'alert-circle-sharp');
    })
  }

  editPartyRolesSubmit() {

  }

}
