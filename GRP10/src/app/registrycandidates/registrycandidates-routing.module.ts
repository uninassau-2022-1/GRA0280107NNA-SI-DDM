import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrycandidatesPage } from './registrycandidates.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrycandidatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrycandidatesPageRoutingModule {}
