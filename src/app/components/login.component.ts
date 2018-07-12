import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [UserService]
})
export class LoginComponent implements OnInit{
	public title: string ;
	public user;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
		){
		this.title = 'Identifícate';
		this.user = {
			"email" : "",
			"password" : "",
			"getHash" : false,
		};
	}
	
	ngOnInit(){
		console.log('El componente login.component ha sido cargado!!');
		this.logout();
		this.redirectIfIdentity();
	}

	logout(){
		this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				window.location.href = './';
			}
		});
	}

	redirectIfIdentity(){
		let identity = this._userService.getIdentity();
		if(identity != null && identity.sub){
			this._router.navigate(['/']);
		}
	}

	onSubmit(){
		console.log(this.user);

		this._userService.signup(this.user).subscribe(
			response => {
				this.identity = response;

				if(this.identity.length <= 1){
					console.log("Error en el servidor");
				}else{
					if(!this.identity.status){
						localStorage.setItem('identity', JSON.stringify(this.identity));

						//GET TOKEN
						this.user.getHash = true;
						this._userService.signup(this.user).subscribe(
							response => {
								this.token = response;

								if(this.token.length <= 1){
									console.log("Error en el servidor");
								}else{
									if(!this.token.status){
										localStorage.setItem('token', JSON.stringify(this.token));
										window.location.href = './';
									}
								}
							},
							error => {
								console.log(<any>error);
							});
					}
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}
}