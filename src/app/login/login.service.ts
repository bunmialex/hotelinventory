import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAdmin: boolean = false;

  router : any;

  isLoggedIn: boolean = false

  constructor(private route: Router) { 
    this.router = route;
  }

  login(email: string, password: string){
    if(email ==="admin@gmail.com" && password === "Admin"){
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if(email ==="user@gmail.com" && password === "User"){
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
