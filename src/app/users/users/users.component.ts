import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { UsersService } from '../users.service';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchText: string = '';
  selectedUsersIds: number[] = [];
  allSelected: boolean = false;
  getUsersSubscription: Subscription = new Subscription()

  constructor(public usersService: UsersService, public apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getUsersSubscription = this.usersService.getUsers().subscribe(users => this.users = users)
  }

  ngOnDestroy(): void {
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }

  addUser(newUser: User) {
    this.users.push(newUser)
  }

  deleteUsers(): void {
    if (this.selectedUsersIds.length > 0) {
      for (const userId of this.selectedUsersIds) {
        this.usersService.deleteUser(userId).subscribe(res => this.users = this.users.filter(user => user.id !== userId))
      }
    }
    this.selectedUsersIds = []
  }

  onSortClick(): void {
    this.usersService.sortData(this.users)
  }

  onUserSelected(userId: number, selected: boolean) {
    if (selected) {
      this.selectedUsersIds.push(userId)
    } else {
      const index = this.selectedUsersIds.indexOf(userId);
      if (index !== -1) {
        this.selectedUsersIds.splice(index, 1)
      }
    }
  }

  onSelectAllClick(checked: boolean): void {
    this.allSelected = checked;
    if (checked) {
      this.selectedUsersIds = this.users.map(user => user.id)
    } else {
      this.selectedUsersIds = []
    }
  }

  onSearchTextEntered(searchValue: string): void {
    this.searchText = searchValue
  }

}
