import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailsTaskPage } from './details-task.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

const routes: Routes = [
  {
    path: '',
    component: DetailsTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailsTaskPage],
  providers: [
    SocialSharing
  ]
})
export class DetailsTaskPageModule { }
