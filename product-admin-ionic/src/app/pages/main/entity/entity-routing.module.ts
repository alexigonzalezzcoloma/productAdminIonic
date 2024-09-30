import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityPage } from './entity.page';

const routes: Routes = [
  {
    path: '',
    component: EntityPage
  },  {
    path: 'district',
    loadChildren: () => import('./district/district.module').then( m => m.DistrictPageModule)
  },
  {
    path: 'church',
    loadChildren: () => import('./church/church.module').then( m => m.ChurchPageModule)
  },
  {
    path: 'gps',
    loadChildren: () => import('./gps/gps.module').then( m => m.GpsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityPageRoutingModule {}
