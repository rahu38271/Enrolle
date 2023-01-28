import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssemblyComponent } from './assembly/assembly.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddAssemblyComponent } from './add-assembly/add-assembly.component';
import { EditAssemblyComponent } from './edit-assembly/edit-assembly.component';
import { ImportAssemblyComponent } from './import-assembly/import-assembly.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AssemblyComponent,
    AddAssemblyComponent,
    EditAssemblyComponent,
    ImportAssemblyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([{path:'', component: AssemblyComponent}, {path:'add-assembly', component: AddAssemblyComponent}, {path:'edit-assembly', component: AddAssemblyComponent}, {path:'import-assembly', component: ImportAssemblyComponent}])
  ]
})
export class AssemblyModuleModule { }
