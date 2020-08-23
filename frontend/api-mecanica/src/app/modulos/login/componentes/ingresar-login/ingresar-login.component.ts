import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {ToasterService} from 'angular2-toaster';
import {UsuarioService} from '../../../../servicios/usuario-service/usuario.service';
import {Router} from '@angular/router';
import {mascaraCedula} from '../../../../constantes/mascaras/mascara.cedula';
import {debounceTime} from 'rxjs/operators';
import {SesionInterface} from '../../../../interfaces/sesion.interface';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CookieService} from 'ngx-cookie';
import {MatDialog} from '@angular/material';
import {ModalCambiarContraseniaComponent} from '../../modal/modal-cambiar-contrasenia/modal-cambiar-contrasenia.component';

@Component({
  selector: 'app-login',
  templateUrl: 'ingresar-login.component.html',
  styleUrls: ['ingresar-login.component.sass']
})
export class IngresarLoginComponent implements OnInit {

  formularioLogin: FormGroup;
  datosAccesos: SesionInterface;
  mensajeError: string;
  existeUsuario: boolean;
  idUsuario: number;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _usuarioService: UsuarioService,
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _dialog: MatDialog
  ) {
    this.formularioLogin = new FormGroup({
      cedulaUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]{9}[-][0-9]{1}|[0-9]{10}/)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  mascaraCedula = mascaraCedula;

  arregloMensajesDeErrorCedula: string[] = [];
  arregloMensajesDeErrorPassword: string[] = [];

  mensajesDeErrorCedula = {
    required: 'Campo cedula es requerido',
    minlength: 'Campo cedula debe tener 10 numeros',
    maxlength: 'Campo cedula debe tener 10 numeros',
    pattern: 'Cedula debe tener solo numeros.'
  };

  mensajesDeErrorPassword = {
    required: 'Campo estado civil es requerido'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.escucharCampo('cedulaUsuario', this.arregloMensajesDeErrorCedula, this.mensajesDeErrorCedula);
    this.escucharCampo('password', this.arregloMensajesDeErrorPassword, this.mensajesDeErrorPassword);
  }

  escucharFormulario() {
    this.formularioLogin
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: UsuarioInterface) => {
          const esValido = this.formularioLogin.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1000,
              showCloseButton: true
            });
            valoresDeFormulario.cedulaUsuario = valoresDeFormulario.cedulaUsuario.replace(/[-]+/g, '');
            this.datosAccesos = valoresDeFormulario;
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1800,
              showCloseButton: true
            });
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioLogin.get(nombreCampo);
    campo$
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        campo => {
          arregloMensajesDeError.pop();
          arregloMensajesDeError.push(this.llenarMensajeDeError(
            campo$,
            objetoMensajesDeError
          ));
        }
      );
  }

  llenarMensajeDeError(control: AbstractControl, objetoErrores: {}): string [] | boolean {
    if ((control.dirty || control.touched) && control.errors) {
      return Object.keys(control.errors).map(
        (llave) => {
          return objetoErrores[llave];
        }
      );
    } else {
      return false;
    }
  }

  enviarFormularioLogin() {
    this.formularioLogin;
  }

  buscarUsuarioLogeado(datos: SesionInterface) {
    const exitenDatos = datos !== undefined;

    if (exitenDatos) {
      const query = {
        cedulaUsuario: datos.cedulaUsuario,
        password: datos.password
      };
      this._usuarioService.obtenerCredencialesDeUsuarioLogeado(query)
        .subscribe(
          (respuesta: RespuestaInterface) => {
            const dato = respuesta.data[0];
            this.existeUsuario = dato === undefined;
            if (this.existeUsuario) {
              this.mensajeError = 'Credenciales incorrectas';
            } else if (respuesta.data[0].password === 'A12345678a') {
              this.idUsuario = respuesta.data[0].id;
              this.abrirModalCambiarContrasenia();
            } else {
              this._router.navigate(['/inicio']);
              this.guardarUsuarioEnCookie(dato);
            }

          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se encontro usuario logrado.',
              timeout: 1000,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalCambiarContrasenia() {
    const modalCambiarContrasenia$ = this._dialog.open(
      ModalCambiarContraseniaComponent, {
        width: '35rem',
        data: false,
        disableClose: true
      }
    );

    modalCambiarContrasenia$
      .afterClosed()
      .subscribe(
        respuesta => {
          const query: UsuarioInterface = {
            password: respuesta.contrasenia
          };
          this.actualizarContraseniaUsuario(query, this.idUsuario);
          this.limpiarFormulario();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal cambiar contrasenia.',
            timeout: 1000,
            showCloseButton: true
          });
        }
      );
  }

  actualizarContraseniaUsuario(datos: UsuarioInterface, idUsuario: number) {
    this._usuarioService.actualizarUsuario(datos, idUsuario)
      .subscribe(
        respuesta => {
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Contrasenia actualizada con exito.',
            timeout: 1000,
            showCloseButton: true
          });

        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo actualizar contrasenia.',
            timeout: 1000,
            showCloseButton: true
          });
        }
      );
  }

  limpiarFormulario() {
    this.formularioLogin.setValue({
      cedulaUsuario: '',
      password: ''
    });
  }

  guardarUsuarioEnCookie(usuario: UsuarioInterface) {
    this._cookieService.put('usuario-logeado', JSON.stringify(usuario));
  }

  igresarSistemas() {
    this.buscarUsuarioLogeado(this.datosAccesos);
  }
}
