import { AuthService } from './../shared/services/auth.service';
import { MENU_ITEMS } from './pages-menu';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  showlogin;
  menu = MENU_ITEMS;
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
