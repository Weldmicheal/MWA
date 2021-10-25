import { Component, OnInit, ViewChild } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersDataServiceService } from '../users-data-service.service';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  //@ViewChild('registerationForm')
  registerationForm!: FormGroup
  user!: User 

  message!:string
  err!:string
  
  constructor(private usersDataService: UsersDataServiceService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerationForm = this._formBuilder.group({
      name: ["Jack", Validators.required],
      username: ["Jack2021", [Validators.required, Validators.minLength(6)]],
      password: ["123", Validators.required],
      passwordRepeat: ["123", Validators.required]
    })
    // this.registerationForm= new FormGroup({
    //   name: new FormControl("Jack"),
    //   username: new FormControl("Jack2021"),
    //   password: new FormControl("123"),
    //   passwordRepeat: new FormControl("123")
    // })
  }
 
  onRegisterUser(){
    console.log("Values are ", this.registerationForm.value);

    //this.usersDataService.addUser(this.registerationForm.value).then(response => this.user = response)
    console.log("User", this.user);

    var user = {username: this.registerationForm.value.username, password:this.registerationForm.value.password }
    console.log(user);
    if(!this.registerationForm.value.username || !this.registerationForm.value.password){
        this.err = "Please add a username and password"
    }else{
        if(this.registerationForm.value.password !== this.registerationForm.value.passwordRepeat){
            this.err = "Please make sure the password matches"
        }else{

          this.usersDataService.addUser(this.registerationForm.value).then(response => {
            this.user = response
            this.message = "Successful registration"
            this.err = ""
          })            
        }
    }
    
  }

}

export class User {
  name!: string
  username!: string
  password!: string
  passwordRepeat!: string
}

