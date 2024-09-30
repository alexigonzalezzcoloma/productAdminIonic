import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventRequestPage } from './event-request.page';

const routes: Routes = [
  {
    path: '',
    component: EventRequestPage
  },
  {
    path: ':id',
    component: EventRequestPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRequestPageRoutingModule {}
