import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
	selector: 'register',
	templateUrl: '../views/register.html',
	providers: [UserService]
})
export class RegisterComponent implements OnInit{
	public title: string ;
	public user: User;
	public status;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Registro';
		this.user = new User(1, "user", "", "", "", "");
	}
	
	ngOnInit(){
		console.log('El componente register.component ha sido cargado!!');
	}

	onSubmit(){
		console.log(this.user);
		this._userService.register(this.user).subscribe(
			response => {
				this.status = response.status;
				if(response.status != 'Success'){
					this.status = 'Error';
				}else{
					this.user = new User(1, "user", "", "", "", "");
				}
			},
			error => {
				console.log(<any>error)
			}
			);
	}
}