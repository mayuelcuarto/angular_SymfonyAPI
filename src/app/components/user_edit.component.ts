import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
	selector: 'user-edit',
	templateUrl: '../views/user_edit.html',
	providers: [UserService]
})
export class UserEditComponent implements OnInit {
	public title: string;
	public user: User;
	public status;
	public identity;
	public token;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.title = 'Modificar mis datos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		if(this.identity == null){
			this._router.navigate(['/login']);
		}else{
			this.user = new User(
				this.identity.sub,
				this.identity.role,
				this.identity.name,
				this.identity.surname,
				this.identity.email,
				this.identity.password
				);
		}
		//console.log("OnInit");
		//console.log(this.identity);
	}

	onSubmit(){
		this._userService.update_user(this.user).subscribe(
			response => {
				this.status = response.status;
				if(this.status != 'Success'){
					this.status = 'Error';
				}else{
					this.identity.sub = response.user.id;
					this.identity.name = response.user.name;
					this.identity.surname = response.user.surname;
					this.identity.email = response.user.email;
					//console.log("OnSubmit");
					//console.log(this.identity);
					localStorage.setItem('identity', JSON.stringify(this.identity));
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}
}