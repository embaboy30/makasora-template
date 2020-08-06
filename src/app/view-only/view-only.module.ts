import { ViewOnlyComponent } from './view-only.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOnlyRoutingModule } from './view-only-routing.module';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';


@NgModule({
  declarations: [
    ViewOnlyComponent,
    ArticleDashboardComponent,
  ],
  imports: [
    CommonModule,
    ViewOnlyRoutingModule
  ]
})
export class ViewOnlyModule { }
