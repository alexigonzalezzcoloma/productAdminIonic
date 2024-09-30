import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntityPageRoutingModule } from './entity-routing.module';

import { EntityPage } from './entity.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntityPageRoutingModule,
    SharedModule
  ],
  declarations: [EntityPage]
})
export class EntityPageModule {}
