import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user = {
    usuario: '',
    password: '',
  };

  msj = '';
  constructor(private router: Router) {}

  conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user },
      };
      this.router.navigate(['/perfil'], navigationExtras);
    } else {
      this.msj = 'Credenciales no pueden estar vacias';
    }
  }
}
