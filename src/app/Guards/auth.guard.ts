import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = new AuthService();
  const router: Router = new Router();

  if (auth.isConnected()) {
    return true;
  } else {
    router.navigate(['/home']);

    /* 1.- DISEÑO DE PAGINA DE ERROR
       2.- GENERACION DE TOAST CUANDO INGRESE SIN CREDENCIALES
       
    */
    /* Aqui va el Toast */
    return false;
  }
};
