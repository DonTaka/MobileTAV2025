import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

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
  carga = false;
  constructor(private router: Router, private animation: AnimationController) {}

  conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if (
        this.user.usuario == 'j.riquelmee' &&
        this.user.password == 'pass1234'
      ) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user },
        };
        this.carga = true;
        this.msj = 'Conexion Exitosa';
        /* setTimeout permite generar un delay en MS */
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.msj = '';
          this.carga = false;
        }, 3000);
      } else {
        this.msj = 'Credenciales erroneas';
      }
    } else {
      this.msj = 'Credenciales no pueden estar vacias';
    }
  }

  ngAfterContentInit() {
    this.animacionLogin();
  }

  animacionLogin() {
    /* Seleccionamos el elemento que deseamos utilizar para la animacion
       POr medio de un querySelector
    */
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    ) as HTMLElement;
    /* Una vez seleccionamos , generamos la animacion por medio del animation controller
      Rectificar cada atributo en la documentacion 
      https://ionicframework.com/docs/utilities/animations
    */
    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0,
          opacity: '1',
          border: '10px solid white',
          transform: 'translateX(0px)',
        },
        {
          offset: 0.25,
          opacity: '0.5',
          border: '10px solid red',
          transform: 'translateX(100px)',
        },
        {
          offset: 0.5,
          opacity: '1',
          border: '10px solid blue',
          transform: 'translateX(0px)',
        },
        {
          offset: 0.75,
          opacity: '1',
          border: '10px solid green',
          transform: 'translateX(-100px)',
        },
        {
          offset: 1,
          opacity: '1',
          border: '10px solid cyan',
          transform: 'translateX(0px)',
        },
      ]);
    /* Por ultimo le damos play a la animacion para que empiece */
    animacion.play();
  }
}
