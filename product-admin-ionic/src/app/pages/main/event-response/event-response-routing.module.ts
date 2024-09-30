import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventResponsePage } from './event-response.page';

const routes: Routes = [
  {
    path: '',
    component: EventResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventResponsePageRoutingModule {}
