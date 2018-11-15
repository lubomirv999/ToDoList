import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover-home',
  templateUrl: './popover-home.page.html',
  styleUrls: ['./popover-home.page.scss'],
})
export class PopoverHomePage implements OnInit {
  logout;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.logout = this.navParams.get('logout');
  }
}
