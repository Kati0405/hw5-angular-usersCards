import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  @Output() userAdded: EventEmitter<User>

  constructor() {
    this.userAdded = new EventEmitter()
  }

  onSubmit(newUser: User): void {
    this.userAdded.emit(newUser)
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.pattern("^[0-9]*$")])
    })
  }

  get name() { return this.userForm.get('name') }
  get phone() { return this.userForm.get('phone') }
  get email() { return this.userForm.get('email') }
}
