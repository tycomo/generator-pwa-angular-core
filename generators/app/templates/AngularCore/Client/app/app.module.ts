import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { routing } from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { ToDoComponent } from './todo/todo.component';
import { NavbarComponent } from './ui/navbar/navbar.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, ToDoComponent, NavbarComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        routing,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        HttpModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
