import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {MecanicoService} from '../../../../servicios/mecanico-service/mecanico.service';
import {debounceTime} from 'rxjs/operators';
import {MecanicoPorMecanicaInterface} from '../../../../interfaces/mecanico.por.mecanica.interface';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-crear-mecanico-por-mecanica',
  templateUrl: 'crear-mecanico-por-mecanica.component.html',
  styleUrls: ['crear-mecanico-por-mecanica.component.sass']
})
export class CrearMecanicoPorMecanicaComponent implements OnInit {

  formularioMecanicoPorMecanica: FormGroup;
  @Output() datosMecanicoPorMecanica: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() mecanicoPorMecanica: MecanicoPorMecanicaInterface;

  mecanicos: MecanicoInterface[];

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _mecanicoService: MecanicoService
  ) {
    this.formularioMecanicoPorMecanica = new FormGroup({
      mecanicos: new FormControl('', [
        Validators.required
      ])
    });
  }

  arregloMensajesDeErrorMecanicoPorMecanica: string[] = [];

  mensajesDeErrorMecanicoPorMecanica = {
    required: 'Seleccione al menos un mecanico'
  };

  ngOnInit(): void {
    this.listarMecanicoDisponibles();
    this.escucharFormulario();
    this.escucharCampo('mecanicos', this.arregloMensajesDeErrorMecanicoPorMecanica, this.mensajesDeErrorMecanicoPorMecanica);
  }

  escucharFormulario() {
    this.formularioMecanicoPorMecanica
      .valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(
        (valoresDeFormulario: MecanicoPorMecanicaInterface) => {
          const esValido = this.formularioMecanicoPorMecanica.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosMecanicoPorMecanica.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop(
              {
                type: 'warning',
                title: 'Cuidado',
                body: 'Formulario con errores',
                timeout: 1500,
                showCloseButton: true
              }
            );
            this.datosMecanicoPorMecanica.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioMecanicoPorMecanica.get(nombreCampo);
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

  enviarFormularioMecanico() {
    this.formularioMecanicoPorMecanica;
  }

  // // llenar select
  listarMecanicoDisponibles() {
    this._mecanicoService.obtnerMecanicosDisponibles(0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicos = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar mecanicos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}
