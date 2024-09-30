import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListEventsPageRoutingModule } from './list-events-routing.module';

import { ListEventsPage } from './list-events.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListEventsPageRoutingModule
  ],
  declarations: [ListEventsPage]
})
export class ListEventsPageModule {}
