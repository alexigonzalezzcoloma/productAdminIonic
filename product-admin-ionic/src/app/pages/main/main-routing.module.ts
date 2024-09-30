import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[{
      path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
    }]
  },
  {
    path: 'entity',
    loadChildren: () => import('./entity/entity.module').then( m => m.EntityPageModule)
  },
  {
    path: 'event-request',
    loadChildren: () => import('./event-request/event-request.module').then( m => m.EventRequestPageModule)
  },
  {
    path: 'event-response',
    loadChildren: () => import('./event-response/event-response.module').then( m => m.EventResponsePageModule)
  },  {
    path: 'list-events',
    loadChildren: () => import('./list-events/list-events.module').then( m => m.ListEventsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
