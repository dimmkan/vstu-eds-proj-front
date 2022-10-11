import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

export interface User {
  name: string
  password: string
  id: number
}

@Injectable({providedIn: 'root'})
export class UsersService{

  users: User[] = []

  constructor(public http: HttpClient) {
    this.http.get<User[]>(`${environment.api_url}:3000/users`)
      .subscribe(response =>{
        this.users = response
      })
  }


  getById(id: number) {
    return this.users.find(
      p => p.id == id
    )
  }
}
