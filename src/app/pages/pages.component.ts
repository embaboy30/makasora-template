import { AuthService } from './../shared/services/auth.service';
import { MENU_ITEMS } from './pages-menu';
import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
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
    private menuService: NbMenuService,
  ) {
    this.menuService.onItemClick().subscribe((res) => {
      if (res.item.title === 'Log out') {
        this.authService.logout();
      }
    });
  }

  ngOnInit(): void {
  }

}
