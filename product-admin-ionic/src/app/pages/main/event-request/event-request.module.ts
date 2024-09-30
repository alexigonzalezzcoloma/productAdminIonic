import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventRequestPageRoutingModule } from './event-request-routing.module';

import { EventRequestPage } from './event-request.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventRequestPageRoutingModule,
    SharedModule
  ],
  declarations: [EventRequestPage]
})
export class EventRequestPageModule {}
