import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.sass']
})
export class NavbarComponent {

  constructor(
    private readonly _cookieService: CookieService
  ) {}

  salirSistema() {
    this._cookieService.remove('usuario-logeado');
  }
}
