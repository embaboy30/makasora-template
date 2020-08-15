import { NgModule } from '@angular/core';
import { UserDetailResolverService } from './shared/resolver/user-detail-resolver.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      resolve: {
        userDetails: UserDetailResolverService,
      },
  },
  {
    path: 'blog',
    loadChildren: () => import('./view-only/view-only.module')
      .then(m => m.ViewOnlyModule)
  },
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: '**', redirectTo: 'blog'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
