import { Component } from '@angular/core';
import { routerTransition, hostStyle } from '../router.animations';

@Component({
  selector: '<%= selector %>-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  animations: [routerTransition()],
  host: hostStyle()
})
export class HomeComponent { }
