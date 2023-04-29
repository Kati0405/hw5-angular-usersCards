import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = this.usersService.getUsers();
  searchText: string = '';

  constructor(public usersService: UsersService) {
  }

  onDeleteClick(): void {
    this.users = this.usersService.deleteUsers()
  }

  onSortClick(): void {
    this.usersService.sortData()
  }

  onSelectAllClick(e: MatCheckboxChange): void {
    this.usersService.selectAll(e)
  }

  onSearchTextEntered(searchValue: string): void {
    this.searchText = searchValue
  }

}
