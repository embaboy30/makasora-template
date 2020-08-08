import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbSidebarModule, NbMenuModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NebularImportsModule } from './shared/nebular-imports.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NebularImportsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,

    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent],
})
export class AppModule { }
