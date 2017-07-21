import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToDoComponent } from './todo/todo.component'

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'todo', component: ToDoComponent }
];

export const routing = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });

