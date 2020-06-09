import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users = {} as Users;
  userLo
  constructor( private router: Router, private authServico: AuthService) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.authServico.register(this.users).subscribe((user) => {
      localStorage.setItem('token', user.token),
      this.userLo = user['user'];
      console.log(this.userLo)
      
        this.router.navigate(['/project'])
    }
          
   )
  
  }
  
  }
  
   
  


