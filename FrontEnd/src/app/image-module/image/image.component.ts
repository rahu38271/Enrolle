import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  userId:any;
  isImage=true;
  isStatic=false;
  imageUrl:any;
  roleId:any;
  superId:any;

  constructor(
    private router:Router,
    private voter:VoterService,
    //private complaint:ComplaintService
  ) {
    
   }

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.userId = localStorage.getItem("loginId");
    this.userId = Number(this.userId);
    this.roleId = localStorage.getItem('userType');
    this.superId = localStorage.getItem('superAdminId');
    if(this.roleId == 2){
      this.userId = this.userId
    }
    else{
      this.userId = this.superId
    }
    this.voter.getLandingImage(this.userId).subscribe((data: Blob) => {
      if(data.type != 'text/plain'){
        this.saveFile(data);
        this.fetchImage(data);
        setTimeout(() => {
          this.imageUrl=true;
          this.router.navigate(['/home/mobile-dashboard'])
        }, 2000);
        this.isStatic=false;
        
      }
      else{
        this.isStatic=true;
        setTimeout(() => {
          this.isStatic=true;
          this.router.navigate(['/home/mobile-dashboard'])
        }, 2000);
      }
      
    },(err)=>{
     
    })
    
    
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

}
