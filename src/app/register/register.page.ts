import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(private toast: ToastController, private router: Router) {}

  user = {
    usuario: '',
    correo: '',
    password: '',
  };
  ngOnInit() {}

  registrar() {
    if (
      this.user.usuario.trim().length > 0 ||
      this.user.password.trim().length > 0 ||
      this.user.correo.trim().length > 0
    ) {
      const navigation: NavigationExtras = {
        state: {
          user: this.user,
        },
      };
      this.generarToast('Registro Exitoso \n Redireccionando');
      setTimeout(() => {
        this.router.navigate(['/perfil'], navigation);
      }, 3000);
    } else {
      this.generarToast('Credenciales no pueden estar vacias');
    }
  }
  generarToast(mensaje: string) {
    const toast = this.toast.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    toast.then((res) => {
      res.present();
    });
  }
}
