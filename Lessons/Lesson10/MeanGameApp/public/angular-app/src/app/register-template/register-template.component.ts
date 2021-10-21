import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register-template',
  templateUrl: './register-template.component.html',
  styleUrls: ['./register-template.component.css']
})
export class RegisterTemplateComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm!:NgForm;
  user!: User 


  constructor() { }

  ngOnInit(): void {
    this.user = {
      name: "Jack",
      username: "Jack2021",
      password: "123",
      passwordRepeat:"123"
    }
    setTimeout(() =>{
      this.registrationForm.setValue(this.user)

    })
  }

  onSubmit(){
  //onSubmit(){
    console.log("submitter");
    console.log("Values are ", this.registrationForm.value);
    console.log("User", this.user);
    
  }

  // onClear(form:NgForm){
  
  onClear(){
    this.registrationForm.resetForm();
   
    // this.user = {
    //   name:"",
    //   username:"",
    //   password:"",
    //   passwordRepeat:""

    // }
  }

}

export class User {
  name!: string
  username!: string
  password!: string
  passwordRepeat!: string
}
