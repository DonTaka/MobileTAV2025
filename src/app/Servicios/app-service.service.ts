import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor() {}

  saludo() {
    console.log('Hola soy un mensaje de prueba');
  }
}
