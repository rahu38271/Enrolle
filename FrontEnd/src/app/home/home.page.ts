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
    var isMasterAdmin = roleName == "1"
    var isSuperAdmin = roleName == "2"
    var isAdmin = roleName == "3";
    var isVolunteer = roleName == "4"
    
    this.isTab = isSuperAdmin || isAdmin;
  }

  

}


