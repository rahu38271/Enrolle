import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  isImage=true;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isImage=false;
    }, 3000);
    this.router.navigate(['/home/mobile-dashboard'])
  }

}
