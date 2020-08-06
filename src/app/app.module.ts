import { ViewOnlyModule } from './view-only/view-only.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PagesModule } from './pages/pages.module';
import { ViewOnlyComponent } from './view-only/view-only.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewOnlyComponent
  ],
  imports: [
    ViewOnlyModule,
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
