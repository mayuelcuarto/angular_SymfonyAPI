import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
	selector: 'task-new',
	templateUrl: '../views/task_new.html',
	providers: [UserService, TaskService]
})

export class TaskNewComponent implements OnInit {
	public page_title: string;
	public identity;
	public token;
	public task: Task;
	public status_task;

	constructor(
		private _userService: UserService,
		private _taskService: TaskService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.page_title = "Crear nueva tarea";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		if(this.identity == null && !this.identity.sub){
			this._router.navigate(['/login']);
		}else{
			this.task = new Task(1, "", "", "new", null, null);
		}
	}

	onSubmit(){
		console.log(this.task);

		this._taskService.create(this.token, this.task).subscribe(
			response => {
				this.status_task = response.status;
				console.log(this.status_task);
				if(this.status_task != 'Success'){
					this.status_task = 'Error';
				}else{
					this.task = response.data;

					//this._router.navigate(['/task', this.task.id]);
					this._router.navigate(['/']);
				}
			},
			error => {
				console.log(<any>error)
			}
			);
	}
}