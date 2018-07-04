import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders } from './app.routing';

import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { UserEditComponent } from './components/user_edit.component';
import { TaskNewComponent } from './components/task_new.component';
import { TaskDetailComponent } from './components/task_detail.component';
import { TaskEditComponent } from './components/task_edit.component';
import { GenerateDatePipe } from './pipes/generate_date.pipe';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
  AppComponent,
  DefaultComponent,
  LoginComponent,
  RegisterComponent,
  UserEditComponent,
  TaskNewComponent,
  TaskDetailComponent,
  TaskEditComponent,
  GenerateDatePipe
  ],
  imports: [
  BrowserModule,
  routing,
  FormsModule,
  HttpModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
