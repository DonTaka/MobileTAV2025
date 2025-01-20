import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = new AuthService();
  const router: Router = new Router();
  const toastController: ToastController = new ToastController();

  if (auth.isConnected()) {
    return true;
  } else {
    router.navigate(['/home']);

    const toast = toastController.create({
      message: 'Debe autentificarse para acceder',
      duration: 3000,
      position: 'middle',
    });
    toast.then((res) => {
      res.present();
    });
    return false;
  }
};
