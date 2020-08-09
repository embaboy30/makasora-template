import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./view-only/view-only.module')
      .then(m => m.ViewOnlyModule),
  },
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: '**', redirectTo: 'blog'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
