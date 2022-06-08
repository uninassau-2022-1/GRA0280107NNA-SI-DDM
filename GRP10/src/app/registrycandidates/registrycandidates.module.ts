import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrycandidatesPageRoutingModule } from './registrycandidates-routing.module';

import { RegistrycandidatesPage } from './registrycandidates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrycandidatesPageRoutingModule
  ],
  declarations: [RegistrycandidatesPage]
})
export class RegistrycandidatesPageModule {}
