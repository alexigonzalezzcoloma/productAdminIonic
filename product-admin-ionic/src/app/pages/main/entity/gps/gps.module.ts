import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GpsPageRoutingModule } from './gps-routing.module';

import { GpsPage } from './gps.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GpsPageRoutingModule,
    SharedModule
  ],
  declarations: [GpsPage]
})
export class GpsPageModule {}
