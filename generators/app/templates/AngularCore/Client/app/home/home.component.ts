import { Component } from '@angular/core';
import { routerTransition, hostStyle } from '../router.animations';

@Component({
  selector: 'appc-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  animations: [routerTransition()],
  host: hostStyle()
})
export class HomeComponent { }
