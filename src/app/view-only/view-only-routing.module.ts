import { ViewArticleComponent } from './view-article/view-article.component';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ViewOnlyComponent } from './view-only.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewOnlyComponent,
    children: [
      {
        path: 'dashboard',
        component: ArticleDashboardComponent,
      },
      {
        path: 'article/:key',
        component: ViewArticleComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOnlyRoutingModule { }
