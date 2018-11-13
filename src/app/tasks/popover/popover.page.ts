import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  id: string;
  delete;
  share;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.delete = this.navParams.get('delete');
    this.share = this.navParams.get('share');
  }
}