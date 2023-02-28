import { Component, OnInit } from '@angular/core';
import { SuperadminService} from 'src/app/services/superadmin.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  getAllAdmin: any;
  Sadmin: any;
  roleId:any;
  roleName:any;
  constructor
    (
      private sadmin:SuperadminService,
      private route:ActivatedRoute,
      //private router:Router
    ) { }

    // EditSA(data:any){
    //   this.router.navigateByUrl('/superadmin/edit-superadmin', {state:data})
    // }

  ngOnInit(): void {
    this.details();
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

  details(){
    this.sadmin.getAllAdmin().subscribe((data) =>{
      const Sid = this.route.snapshot.paramMap.get('id');
      [this.Sadmin] = data.filter((Sadmin) => Sadmin.id == Sid);
      this.getAllAdmin = this.Sadmin;
    })
  }

}
