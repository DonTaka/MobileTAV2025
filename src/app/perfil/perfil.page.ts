import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  constructor() {}
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
}
