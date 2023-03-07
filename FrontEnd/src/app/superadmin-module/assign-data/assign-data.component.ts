import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { SuperadminService } from 'src/app/services/superadmin.service'
import { de } from 'date-fns/locale';

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
  userrole:any;
  EditingUserrole:any;
  constructor
    (
      private route: ActivatedRoute,
      private toast: IonicToastService,
      private loader: LoaderService,
      private router: Router,
      private sadmin: SuperadminService
    ) { }

  ngOnInit() {
    this.userrole  = localStorage.getItem("userType")
    this.SelectedPartNo = [];
    this.Userid = this.route.snapshot.paramMap.get('id');
    this.UserpartNoAssigned = this.route.snapshot.paramMap.get('partNoAssigned');
    this.EditingUserrole = this.route.snapshot.paramMap.get('role');
    this.UserpartNoAssignedarray = this.UserpartNoAssigned.split(',');
    var loginuser = localStorage.getItem("loginId");
   // this.getallbooths()
 
    this.sadmin.getBooths(Number(this.userrole), Number(loginuser)).subscribe(data => {
      //console.log(data);
      this.allBooths = data;
    
      this.allBooths.forEach(booth => {
        booth.disable = false;
        booth.checked = false; 
        booth.hide = false;
      var index  = this.UserpartNoAssignedarray.findIndex(x=>x == booth.partNo);
          if ( index != -1)
          {
            booth.checked = true; 
            this.SelectedPartNo.push(booth.partNo);
          }
         
          if(this.userrole == '3' || this.userrole == '2' )
          {
            this.sadmin.GetPartNoAssignedOtherthanThisuser(this.Userid, this.userrole).subscribe(notassigned=>{
              if(notassigned)
              {
                
                var arr1  = notassigned.partNo.split(',');
                var index3  = arr1.findIndex(x=>x == booth.partNo);
                if(index3 == -1)
                {
                  booth.disable = false;
                }
                else 
                {
                  booth.disable = true; 
                }
              }
            });
       }
         
      });
console.log(this.allBooths)
    });
    
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
      PartNoAssigned: this.SelectedPartNo.toString(),
      RoleId :Number(this.EditingUserrole)
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
