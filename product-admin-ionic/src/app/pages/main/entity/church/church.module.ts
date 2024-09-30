import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChurchPageRoutingModule } from './church-routing.module';

import { ChurchPage } from './church.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChurchPageRoutingModule,
    SharedModule
  ],
  declarations: [ChurchPage]
})
export class ChurchPageModule {}
