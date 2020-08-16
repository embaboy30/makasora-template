import { ViewOnlyComponent } from './view-only.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOnlyRoutingModule } from './view-only-routing.module';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { NebularImportsModule } from '../shared/nebular-imports/nebular-imports.module';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule } from '@nebular/theme';
import { ViewArticleComponent } from './view-article/view-article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ViewOnlyComponent,
    ArticleDashboardComponent,
    ViewArticleComponent,
  ],
  imports: [
    NebularImportsModule,
    NgbModule,
    CommonModule,
    ViewOnlyRoutingModule,
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
  ]
})
export class ViewOnlyModule { }
