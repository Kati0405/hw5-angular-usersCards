import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './users-mock';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = USERS
  order: 'desc' | 'asc' = 'asc'

  constructor() { }

  getUsers(): User[] {
    return this.users
  }

  deleteUsers(): User[] {
    return this.users.filter(user => !user.isChecked)

  }

  sortData() {
    if (this.order === 'desc') {
      let sortedUsers = this.users.sort(function (a, b) {
        if (a.firstname < b.firstname) {
          return -1;
        }
        if (a.firstname > b.firstname) {
          return 1;
        }
        return 0;
      });
      this.users = sortedUsers
      this.order = 'asc'
    } else {
      let sortedUsers = this.users.sort(function (a, b) {
        if (a.firstname > b.firstname) {
          return -1;
        }
        if (a.firstname < b.firstname) {
          return 1;
        }
        return 0;
      });
      this.users = sortedUsers
      this.order = 'desc'
    }
  }

  selectAll(e: MatCheckboxChange) {
    if (e.checked) {
      this.users = this.users.map((user) => {
        user.isChecked = true;
        return user
      }
      )
    } else {
      this.users = this.users.map((user) => {
        user.isChecked = false;
        return user
      }
      )
    }
  }
}
