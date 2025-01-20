import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  constructor(
    private auth: AuthService,
    private router:Router,
    private toast: ToastController
  ) {}
  user = {
    usuario: '',
    password: '',
  };
  nombreUsuario = '';
  ngOnInit() {}
  ngAfterContentInit() {
    this.user = history.state.user;
    this.nombreUsuario = this.user.usuario;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.generarToast('Usuario Desconectado');
  }

  generarToast(message: string) {
    const toast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });

    toast.then((res) => {
      res.present();
    });
  }
}
