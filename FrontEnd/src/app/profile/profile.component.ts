import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: any;
  roleName: string;
  id: any;
  roleId:any;

  constructor(public popoverController: PopoverController, private router: Router, private route:ActivatedRoute) { }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser")
    //this.roleName = localStorage.getItem("userType");
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
  }

  userDetails(id: number) {
    this.router.navigate(['/superadmin/account', id])
  }

  EditUser(id:number){
    this.router.navigate(['/user/edit-user', id])
  }



  LogOut(){
    this.router.navigateByUrl('/login');
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginId");
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.replace('/login');
  }

}
