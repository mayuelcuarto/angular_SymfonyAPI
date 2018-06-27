import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
	selector: 'default',
	templateUrl: '../views/default.html',
	providers: [UserService, TaskService]
})
export class DefaultComponent implements OnInit{
	public title: string ;
	private identity;
	private token;
	private tasks: Array<Task>;
	public pages;
	public pagePrev;
	public pageNext;
	public loading;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _taskService: TaskService
		){
		this.title = 'Homepage';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}
	
	ngOnInit(){
		console.log('El componente default.component ha sido cargado!!');
		this.getAllTasks();
	}

	getAllTasks(){
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];
			if(!page){
				page = 1;
			}

			this.loading = 'show';
			this._taskService.getTasks(this.token, page).subscribe(
				response => {
					if(response.status == 'Success'){
						this.tasks = response.data;
						this.loading = 'hide';

						// Total de páginas
						this.pages = [];
						for(let i = 0; i < response.total_pages; i++){
							this.pages.push(i);
						}

						//Página anterior
						if(page >= 2){
							this.pagePrev = (page - 1);
						}else{
							this.pagePrev = page;
						}

						//Página siguiente
						if(page < response.total_pages){
							this.pageNext = (page + 1);
						}else{
							this.pageNext = page;
						}
					}
				},
				error => {
					console.log(<any>error);
				}
				);
		})
	}
}