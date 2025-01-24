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

  //Version actualizada del metodo
  //Usamos async para identificar la funcion como asincrona por el uso de llamadas de API
  //Al ser asincronas no responden de forma inmediata si es que esto no esta especificado
  //Por esta razon utilizaremos la funcion await(Esperar que responda antes de seguir)
  //y usaremos la funcion firstValueFrom consumiendo la API lo que nos retorna el primer valor detectado de la llamada

  async loginAPI(user: string, pass: string): Promise<boolean> {
    //Obtenemos el usuario
    let us = await firstValueFrom(this.api.login(user));
    //Si por user no encontramos , buscamos por correo
    if (us.length == 0) {
      us = await firstValueFrom(this.api.logCorreo(user));
    }
    //validamos que el usuario exista
    if (us.length > 0) {
      //SI existe validamos credenciales
      if (
        (us[0].username == user || us[0].correo == user) &&
        us[0].pass == pass
      ) {
        //SI existe lo guardamos en el storage como conectado y retornamos true
        this.storage.setItem('conectado', us[0]);
        return true;
      } else {
        //Credenciales erroneas
        return false;
      }
    } else {
      console.log('llamada vacia');
      return false;
    }
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
