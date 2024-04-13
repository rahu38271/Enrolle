import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular' 
import { RouterModule} from '@angular/router'
import { DailyRoutineComponent} from './daily-routine/daily-routine.component'
import { AddRoutineComponent } from './add-routine/add-routine.component'
import { EditRoutineComponent} from './edit-routine/edit-routine.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [DailyRoutineComponent,AddRoutineComponent,EditRoutineComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: DailyRoutineComponent},{path:'add-routine', component: AddRoutineComponent},{path:'edit-routine', component: EditRoutineComponent}])
  ]
})
export class DailyRoutineModuleModule { }
