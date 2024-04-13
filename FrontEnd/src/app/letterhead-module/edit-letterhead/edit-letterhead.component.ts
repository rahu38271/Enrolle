import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-letterhead',
  templateUrl: './edit-letterhead.component.html',
  styleUrls: ['./edit-letterhead.component.scss'],
})
export class EditLetterheadComponent implements OnInit {

  letterModel: any = {};

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

keyPressNumbers(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

  seniorityHeader:any = {
    header: 'ज्येष्ठता'
  };
  areaHeader:any = {
    header: ' एरिया नाव'
  }
  occupationHeader:any = {
    header: 'व्यवसाय'
  };
  bloodgroupHeader: any = {
    header: ' रक्तगट '
  }

  myForm;
  name = '';
  date = '';
  age = '';
  seniority = '';
  area = '';
  occupation = '';
  bloodgroup = '';
  mobile = '';
  whatsapp = '';
  radio1 = '';
  radio2 = '';
  info = '';
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(){
    if(this.letterModel.invalid){
      return;
    }
  }
  

}
