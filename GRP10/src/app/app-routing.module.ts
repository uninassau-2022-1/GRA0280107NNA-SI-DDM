import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';

const routes: Routes = [



  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registrycandidates',
    loadChildren: () => import('./registrycandidates/registrycandidates.module').then( m => m.RegistrycandidatesPageModule)
  },
  {
    path: 'candidates',
    loadChildren: () => import('./candidatos/candidatos.module').then( m => m.CandidatosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }