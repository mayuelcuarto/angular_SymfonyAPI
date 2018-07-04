import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
	selector: 'task-detail',
	templateUrl: '../views/task_detail.html',
	providers: [UserService, TaskService]
})

export class TaskDetailComponent implements OnInit {
	public identity;
	public token;
	public task: Task;
	public loading;

	constructor(
		private _userService: UserService,
		private _taskService: TaskService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		if(this.identity && this.identity.sub){
			//Llamada al servicio de tareas para sacar una tarea
			//LLamada a método de este componente
			this.getTask();
		}else{
			//this.task = new Task(1, "", "", "new", null, null);
			this._router.navigate(['/login']);
		}
	}

	getTask(){
		this.loading = 'show';
		this._route.params.forEach((params: Params) => {
			let id = +params['id'];

			this._taskService.getTask(this.token, id).subscribe(
				response => {
					if(response.status == 'Success'){
						//console.log(this.task);
						if(response.data.user.id == this.identity.sub){
							//Podemos ver la tarea
							this.task = response.data;
							this.loading = 'hide';
						}else{
							this._router.navigate(['/']);
						}
					}else{
						this._router.navigate(['/login']);
					}
				},
				error => {
					console.log(<any>error);
				}
				);
		});
	}

	deleteTask(id){
		this._taskService.deleteTask(this.token, id).subscribe(
			response => {
				if(response.status == 'Success'){
						this._router.navigate(['/']);
					}else{
						alert("No se ha borrado la tarea");
					}
				},
				error => {
					console.log(<any>error);
				});
	}
}