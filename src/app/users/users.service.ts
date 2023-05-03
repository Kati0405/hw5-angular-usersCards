import { Injectable } from '@angular/core';
import { User } from './user';
import { ApiService } from './api.service';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [];
  order: 'desc' | 'asc' = 'asc'

  constructor(private apiService: ApiService) { }

  getUsers() {
    return this.apiService.get('users')
  }

  addUser(payload: Object) {
    return this.apiService.post('users', payload)
  }

  deleteUser(id: number) {
    return this.apiService.delete('users', id)
  }

  sortData(users: User[]) {
    if (this.order === 'desc') {
      let sortedUsers = users.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      users = sortedUsers
      this.order = 'asc'
    } else {
      let sortedUsers = users.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      users = sortedUsers
      this.order = 'desc'
    }
  }

}