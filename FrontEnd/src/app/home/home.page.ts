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

  constructor() {
     
  }

  ngAfterViewInit() {
       
  }

  ngOnInit(){
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.roleName = localStorage.getItem("userType")

    var roleName = localStorage.getItem("userType");
    //this.roleType = roleName
    var isMasterAdmin = roleName == "MasterAdmin"
    var isSuperAdmin = roleName == "SuperAdmin"
    var isAdmin = roleName == "Admin";
    var isVolunteer = roleName == "Volunteer"
    
    this.isTab = isSuperAdmin || isAdmin;
  }

  

}


