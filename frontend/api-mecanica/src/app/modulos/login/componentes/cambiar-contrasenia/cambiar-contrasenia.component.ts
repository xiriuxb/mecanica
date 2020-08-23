import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: 'cambiar-contrasenia.component.html',
  styleUrls: ['cambiar-contrasenia.component.sass']
})
export class CambiarContraseniaComponent implements OnInit {

  formularioCambiarContrasenia: FormGroup;
  @Output() nuevaContrasenia: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() contrasenia;
  mensajeContraseniaNoCoincide: string;
  bandera: boolean;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router
  ) {
    this.formularioCambiarContrasenia = new FormGroup({
      contrasenia: new FormControl('', [
        Validators.required
      ]),
      confirmar: new FormControl('', [
        Validators.required,
      ])
    });
  }

  arregloMensajesDeErrorContrasenia: string[] = [];
  arregloMensajesDeErrorConfirmar: string[] = [];

  mensajesDeErrorContrasenia = {
    required: 'Campo contrasenia es requerido'
  };

  mensajesDeErrorConfirmar = {
    required: 'Campo confirmar contrasenia es requerido',
    comprobarContrasenia: 'Contrasenias no coinciden.'
  };

  ngOnInit(): void {
    this.escucharFormulario();
    this.escucharCampo('contrasenia', this.arregloMensajesDeErrorContrasenia, this.mensajesDeErrorContrasenia);
    this.escucharCampo('confirmar', this.arregloMensajesDeErrorConfirmar, this.mensajesDeErrorConfirmar);
  }

  escucharFormulario() {
    this.formularioCambiarContrasenia
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: any) => {
          const esValido = this.formularioCambiarContrasenia.valid;
          if (esValido) {
            this.bandera = false;
            this._toasterService.pop({
              type: 'success',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1800,
              showCloseButton: true
            });
            this.nuevaContrasenia.emit(valoresDeFormulario);
          } else {
            this.bandera = true;
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1800,
              showCloseButton: true
            });
            this.nuevaContrasenia.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioCambiarContrasenia.get(nombreCampo);
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

  // llenar mensajes de error
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

  // comprobarContraseniaIgual(contrasenia: string, comprobarContrasenia) {
  //   return (campo: AbstractControl): {[atributo: string]: boolean} | null => {
  //     const contraseniaConfirmada = campo.value === contrasenia;
  //     if (contraseniaConfirmada) {
  //       return null;
  //     } else {
  //       const objeError = {};
  //       objeError[comprobarContrasenia] = true;
  //       return objeError;
  //     }
  //   };
  // }

  enviarFormularioCambiarContrasenia() {
    this.formularioCambiarContrasenia;
  }
}
