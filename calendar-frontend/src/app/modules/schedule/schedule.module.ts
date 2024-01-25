import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ScheduleComponent } from './schedule.component';
import { CalendarComponent } from './component/calendar/calendar.component';

const routesSchedule: Routes = [
  { path: '', component: ScheduleComponent }
]

@NgModule({
  declarations: [ScheduleComponent, CalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesSchedule)
  ]
})
export class ScheduleModule { }
