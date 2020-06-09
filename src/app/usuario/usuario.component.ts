import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Users } from '../models/users';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user = {} as Users;
  users: Users[] = [];

  constructor(private usuarioServico: UsuarioService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getU();

  }
  getU() {
    this.usuarioServico.getUser().subscribe(user => {
      this.users = user

    })
  }

  update() {
    this.usuarioServico.updateUser(this.user).subscribe(() => {
      this.authService.logoutUser();
    })

  }




}
