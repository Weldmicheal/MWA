import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './register-template/register-template.component';
@Injectable({
  providedIn: 'root'
})
export class UsersDataServiceService {

  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) {

   }

   public addUser(user:User): Promise<User> {
    console.log("adding User");
    
    //const userId: string = "5fbed15c07a5894b456a4336"
    const url: string = this.apiBaseUrl + "/users/register"
    return this.httpClient.post(url, user).toPromise()
      .then(response => response as User)
      .catch(this.handleError);


  }

  private handleError(error: any): Promise<any> {
    console.log("Something went wrong", error);
    return Promise.reject(error.message || error)

  }

}
