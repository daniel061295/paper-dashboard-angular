import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SignInService } from './services/login-service.service';
import { answer } from './services/answer.interface';
import { user } from './services/user.interface';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from "ngx-toastr";
import {Title} from "@angular/platform-browser";

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


  constructor(private elementRef: ElementRef,private signIn: SignInService, private router: Router, private cookieService: CookieService,private toastr: ToastrService, private titleService:Title) { 
    this.titleService.setTitle("Login");
  }


  logIn() {
    
    this.signIn.signIn(this.user.username, this.user.password).subscribe((result: any) => {
      this.answer = result;
      this.cookieService.set("token", this.answer.token,4,"/");
      this.router.navigate(['/dashboard']);
    }, error => {
        this.showNotification('top','right');
    });
  }
  showNotification(from, align) {
    this.toastr.warning(
      '<span data-notify="icon" class="nc-icon nc-circle-10"></span><span data-notify="message">Usuario y/o contraseña incorrectas.</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align
        }
      );
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#212120';
}
  ngOnInit(): void {


  }
}