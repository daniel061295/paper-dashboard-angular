import { Component, OnInit, inject } from '@angular/core';
import { SignInService } from './services/login-service.service';
import { answer } from './services/answer.interface';
import { user } from './services/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  answer: answer;
  user: user = {
    "username": "",
    "password": ""
  };


  constructor(private signIn: SignInService, private router: Router) { }


  logIn() {
    console.log(this.user);
    this.signIn.signIn(this.user.username, this.user.password).subscribe((result: any) => {
      this.answer = result;
      console.log(this.answer);
      this.signIn.token = this.answer.token;
      //console.log(this.signIn.isAuth());
      
      if (this.signIn.isAuth()){
        this.router.navigate(['/dashboard']);;
      }
    });
  }

  ngOnInit(): void {


  }
}