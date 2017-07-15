import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component'

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'person', component: PersonComponent }
];

export const routing = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });

