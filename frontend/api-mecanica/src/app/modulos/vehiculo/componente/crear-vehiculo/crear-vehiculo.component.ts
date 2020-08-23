import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {VehiculoInterface} from '../../../../interfaces/vehiculo.interface';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {mascaraPlaca} from '../../../../constantes/mascaras/mascara.placa';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: 'crear-vehiculo.component.html',
  styleUrls: ['crear-vehiculo.component.sass']
})
export class CrearVehiculoComponent implements OnInit {

  formularioVehiculo: FormGroup;
  @Output() datosVehiculo: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() vehiculo: VehiculoInterface;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router
  ) {
    this.formularioVehiculo = new FormGroup({
      placa: new  FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8)
      ]),
      anio: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9 ]*$'),
        this.validaarAnio(1990, 2020, 'anioValido')
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ])
    });
  }

  // Mascara
  mascaraPlaca = mascaraPlaca;

  arregloMensajesDeErrorPlaca: string[] = [];
  arregloMensajesDeErrorAnio: string[] = [];
  arregloMensajesDeErrorDescripcion: string[] = [];

  mensajesDeErrorPlaca = {
    required: 'Campo placa es requerido',
    minlength: 'Placa debe tener 7 caracteres',
    maxlength: 'Placa debe tener 7 caracteres'
  };

  mensajesDeErrorAnio = {
    required: 'Campo anio es requerido',
    minlength: 'Campo anio debe tener 4 digitos.',
    maxlength: 'Campo anio debe tener 4 digitos.',
    pattern: 'Anio debe tener solo numeros.',
    anioValido: 'Solo se permite anios entre 1990 y 2020.'
  };

  mensaesDeErrorDescripcion = {
    required: 'Campo descripcion es requerido'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.llenarFormularioVehiculo();
    this.escucharCampo('placa', this.arregloMensajesDeErrorPlaca, this.mensajesDeErrorPlaca);
    this.escucharCampo('anio', this.arregloMensajesDeErrorAnio, this.mensajesDeErrorAnio);
    this.escucharCampo('descripcion', this.arregloMensajesDeErrorDescripcion, this.mensaesDeErrorDescripcion);
  }

  escucharFormulario() {
    this.formularioVehiculo
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: VehiculoInterface) => {
          const esValido = this.formularioVehiculo.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosVehiculo.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosVehiculo.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioVehiculo.get(nombreCampo);
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

  validaarAnio(anio1: number, anio2: number, anioValido) {
    return  (campo: AbstractControl): {[atributo: string]: boolean}  | null => {
      const campoTieneAnioValido = campo.value >= anio1 && campo.value <= anio2;
      if ( campoTieneAnioValido) {
        return null;
      } else {
        const objError = {};
        objError[anioValido] = true;
        return objError;
      }
    };
  }

  enviarFormularioVehiculo() {
    this.formularioVehiculo;
  }

  llenarFormularioVehiculo() {
    if (this.vehiculo) {
      this.formularioVehiculo.setValue({
        placa: this.vehiculo.placa,
        anio: this.vehiculo.anio,
        descripcion: this.vehiculo.descripcion,
      });
    }
  }
}
