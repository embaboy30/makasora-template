import { MENU_ITEMS } from './pages-menu';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
