import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-booth-coordinator',
  templateUrl: './edit-booth-coordinator.component.html',
  styleUrls: ['./edit-booth-coordinator.component.scss'],
})
export class EditBoothCoordinatorComponent implements OnInit {

  myForm;
  Area = '';
  Assembly = '';
  MainCoordinator = '';
  MainCoordinatorMobile = '';
  MainCoordinatorWhatsapp = '';
  MainCoordinatorFacebook = '';
  AsstCoordinator1 = '';
  AsstCoordinatorMobile1 = '';
  AsstCoordinatorWhatsapp1 = '';
  AsstCoordinatorFacebook1 = '';
  AsstCoordinator2 = '';
  AsstCoordinatorMobile2 = '';
  AsstCoordinatorWhatsapp2 = '';
  AsstCoordinatorFacebook2 = '';
  Remark = '';

  AreaHeader:any = {
    header: 'एरिया नाव'
  }
  AssemblyHeader:any = {
    header: 'विधानसभा बूथ क्रमांक'
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  

  constructor() { }

  ngOnInit() {
   
  }



  resetForm(){
    this.myForm.reset();
  }

}
