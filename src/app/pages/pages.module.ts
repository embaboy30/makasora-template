
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbMenuModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NebularImportsModule } from '../shared/nebular-imports/nebular-imports.module';
import { PagesComponent } from './pages.component';
import { ArticlesComponent } from './articles/articles.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ArticlesComponent,
  ],
  imports: [
    ThemeModule,
    NebularImportsModule,
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
  ],
})
export class PagesModule { }
