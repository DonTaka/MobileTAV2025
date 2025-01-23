import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(
    private toast: ToastController,
    private router: Router,
    private auth: AuthService
  ) {}

  user = {
    usuario: '',
    correo: '',
    password: 'pass1234',
  };
  ngOnInit() {}

  registrar() {
    //Verificamos que los campos tengan valor
    if (
      this.user.usuario.trim().length > 0 ||
      this.user.password.trim().length > 0 ||
      this.user.correo.trim().length > 0
    ) {
      //Verificar si el registro se realizo
      this.auth
        .registerAPI(this.user.usuario, this.user.correo, this.user.password)
        .then((res) => {
          if (res) {
            this.generarToast('Registro Exitoso \n Redireccionando');
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1500);
          } else {
            this.generarToast('Credenciales ya existen');
          }
        });
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
