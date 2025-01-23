import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { APIService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage: LocalStorageService = new LocalStorageService();
  private api: APIService = new APIService();
  constructor() {}

  login(user: string, pass: string): boolean {
    if (
      (user == 'j.riquelmee' || user == 'jo.riquelmee@duocuc.cl') &&
      pass == 'pass1234'
    ) {
      AuthService.isLogged = true;
      return true;
    } else {
      return false;
    }
  }

  loginStorage(user: string, pass: string): boolean {
    //Obtenemos la lista de usuarios
    const listaUsuarios = this.storage.getItem('users') || [];
    //Filtramos la lista segun su usuario/correo y su contraseña
    //Si encuentra retorna un objeto usuario , sino , null
    const conectado = listaUsuarios.find(
      (userFind: any) =>
        (userFind.username == user || userFind.correo == user) &&
        userFind.pass == pass
    );
    //Si conectado tiene valor , las credenciales fueron validas
    //EN caso contrario , se le niega el acceso

    if (conectado) {
      //Guardamos el usuario encontrado en el almacenamiento local
      this.storage.setItem('conectado', conectado);
      return true;
    } else {
      return false;
    }
  }

  loginAPI(user: string, pass: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.login(user).subscribe((res: any) => {
        if (res.length > 0) {
          if (
            (res[0].username == user || res[0].correo == user) &&
            res[0].pass == pass
          ) {
            this.storage.setItem('conectado', JSON.stringify(res[0]));
            resolve(true);
          } else {
            resolve(false);
            console.log('Credenciales no validas');
          }
        } else {
          console.log('Llamada vacia');
        }
      });
    });
  }

  registrar(user: string, correo: string, pass: string) {
    //Recuperamos la lista de usuarios
    const listaUsuarios = this.storage.getItem('users') || [];
    //Comparamos usuario y correo para validar que no existan en el registro de usuarios
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      return false;
    }
    //Creamos una nueva entidad de usuario
    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    //Agregamos a la lista
    listaUsuarios.push(nuevoUsuario);
    //Devolvemos el registro de usuarios a su lugar
    this.storage.setItem('users', listaUsuarios);
    return true;
  }
  /*  */
  async registerAPI(
    user: string,
    correo: string,
    pass: string
  ): Promise<boolean> {
    const users = await firstValueFrom(this.api.listarUsuarios());
    const exists =
      users.find((us: any) => us.username == user || us.correo == correo) !=
      null;
    if (exists) {
      return false;
    }

    const nuevoUsuario = {
      id: users.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    await this.api.register(nuevoUsuario).subscribe();

    return true;
  }

  isConnected(): boolean {
    return this.storage.getItem('conectado') !== null;
  }

  logout() {
    this.storage.removeItem('conectado');
  }
}
