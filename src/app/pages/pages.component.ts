import { AuthService } from './../shared/services/auth.service';
import { MENU_ITEMS } from './pages-menu';
import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  showlogin;
  menu = MENU_ITEMS;
  userMenu = [ { title: 'Profile' }, { title: 'Settings' }, { title: 'Log out' } ];
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.authService.currentUser = this.route.snapshot.data.userDetails;
  }

  ngOnInit(): void {
  }

}
