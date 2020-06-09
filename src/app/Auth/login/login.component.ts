import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Users } from 'src/app/models/users';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users = {} as Users;
  userLo;
  constructor(private router: Router, private authServico: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authServico.login(this.users).subscribe((user) => {
      localStorage.setItem('token', user.token),
        this.userLo = user['user'];
      localStorage.setItem('userId', this.userLo['_id']),

        this.router.navigate(['/project'])
    },

    )

  }
}
