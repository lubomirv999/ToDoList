import { Component } from '@angular/core';

import { UserCreate } from '../models/user-create-model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  bindingModel: UserCreate = new UserCreate('', '');

  constructor(private authService: AuthService) { }

  login() {
    if (this.bindingModel.email.length <= 2 || this.bindingModel.email.length > 50 || this.bindingModel.password.length <= 6 || this.bindingModel.password.length > 150) {
      return;
    }

    this.authService.login(this.bindingModel.email, this.bindingModel.password);
  }
}
