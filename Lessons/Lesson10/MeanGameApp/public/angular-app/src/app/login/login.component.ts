import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  userLoggedIn: boolean = false
  nameOfUser: string = "Unknown"
  errorMessage: string = ""
  
  constructor(private _formBuilder: FormBuilder, private _httpClient: HttpClient, private _jwt: JwtHelperService, private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  onLogin(): void {
    console.log("form.value", this.loginForm.value);
    let credentials: Credentials = new Credentials()
    credentials.username = this.loginForm.value.username
    credentials.password = this.loginForm.value.username

    this._httpClient.post<any>("http://localhost:3000/api/users/login", Credentials).toPromise()
      .then(response => {
        console.log("response", response);
        localStorage.setItem("gamesToken", response.token)

        /////
        const token: string = localStorage.getItem("gamesToken") as string
        this.nameOfUser = this._jwt.decodeToken(token).name;


        this.userLoggedIn = true
        this.loginForm.reset()
        this.errorMessage = ""
        this._router.navigate([''])
      })
      .catch(response => {
        console.log(response);
        
        this.errorMessage = "Login failed"
      })

  }

  onLogout() {
    console.log("logout called");
    localStorage.clear()
    this.userLoggedIn = false
    this.nameOfUser = "Unknown"
    this._router.navigate([''])

  }

}

class Credentials {
  username !: string
  password !: string
}
