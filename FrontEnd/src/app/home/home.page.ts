import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  isTab:any;
  id:any;
  name: any;
  roleName: string;
  roleId:any;

  constructor() {
     
  }

  ngAfterViewInit() {
       
  }

  ngOnInit(){
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.roleId = localStorage.getItem("userType");
    if(this.roleId == 1){
      this.roleName = "MasterAdmin"
    }
    if(this.roleId == 2){
      this.roleName = "SuperAdmin"
    }
    if(this.roleId == 3){
      this.roleName = "Admin"
    }
    if(this.roleId == 4){
      this.roleName = "Volunteer"
    }

    var roleId = localStorage.getItem("userType");
    //this.roleType = roleName
    var isMasterAdmin = roleId == "1"
    var isSuperAdmin = roleId == "2"
    var isAdmin = roleId == "3";
    var isVolunteer = roleId == "4"
    
    this.isTab = isMasterAdmin || isSuperAdmin || isAdmin;
  }

  

}


