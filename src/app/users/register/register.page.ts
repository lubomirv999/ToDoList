import { Component } from '@angular/core';

import { UserCreate } from '../models/user-create-model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  bindingModel: UserCreate = new UserCreate('', '');

  constructor(private authService: AuthService) { }

  register() {
    if (this.bindingModel.email.length <= 2 || this.bindingModel.email.length > 50 || this.bindingModel.password.length <= 6 || this.bindingModel.password.length > 150) {
      return;
    }

    this.authService.register(this.bindingModel.email, this.bindingModel.password);
  }
}
