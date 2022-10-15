import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //@ts-ignore
  user: User
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      //@ts-ignore
      this.user = this.usersService.getById(+params.id)
    })
  }

  deleteUser() {
    this.route.params.subscribe((params: Params) => {
      this.usersService.http.delete(`${environment.api_url}/users/delete/${params.id}`)
        .subscribe(
          () => {
            this.usersService.users = this.usersService.users.filter(p => p.id != +params.id)
            this.router.navigate(['/users'])
          }
        )
    })
  }

  updateUser() {
    console.log(this.user)
    this.route.params.subscribe((params: Params) => {
      this.usersService.http.put(`${environment.api_url}/users/update/${params.id}`, {
        name: this.user.name,
        password: this.user.password
      }).subscribe(
        () => {
          this.router.navigate(['/users'])
        }
      )
    })

  }
}
