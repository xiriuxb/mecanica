import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditoInterface} from '../../../../interfaces/credito.interface';
import {ToasterService} from 'angular2-toaster';
import {mascaraDinero} from '../../../../constantes/mascaras/mascara.dinero';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-crear-credito',
  templateUrl: 'crear-credito.component.html',
  styleUrls: ['crear-credito.component.sass']
})
export class CrearCreditoComponent implements OnInit {

  formularioAgregarCredito: FormGroup;
  @Output() datosCredito: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() credito: CreditoInterface;

  constructor(
    private readonly _toasterService: ToasterService
  ) {
    this.formularioAgregarCredito = new FormGroup({
      movimientoEconomico: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 ]*[.][0-9 ]{2}|[0-9 ]*$')
      ])
    });
  }

  mascaraDineroCredito = mascaraDinero;

  arregloMensajesDeErrorCredito: string[] = [];

  mensaesDeErrorCredito = {
    required: 'Campo dinero es requerido',
    pattern: 'Debe ingresar solo numeros.'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.escucharCampo('movimientoEconomico', this.arregloMensajesDeErrorCredito, this.mensaesDeErrorCredito);
  }

  escucharFormulario() {
    this.formularioAgregarCredito
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: CreditoInterface) => {
          const esValido = this.formularioAgregarCredito.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosCredito.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosCredito.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioAgregarCredito.get(nombreCampo);
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

  // // llenar mensajes de error
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

  // enviar formulario
  enviarFormularioCredito() {
    this.formularioAgregarCredito;
  }
}
