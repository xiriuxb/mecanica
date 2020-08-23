import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActividadPorMecanicaInterface} from '../../../../interfaces/actividad.por.mecanica.interface';
import {ActividadInterface} from '../../../../interfaces/actividad.interface';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {ActividadService} from '../../../../servicios/actividad/actividad.service';
import {debounceTime} from 'rxjs/operators';
import {ActividadPorMecanicoInterface} from '../../../../interfaces/actividad.por.mecanico.interface';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-crear-actividad-por-mecanica',
  templateUrl: 'crear-actividad-por-mecanica.component.html',
  styleUrls: ['crear-actividad-por-mecanica.component.sass']
})
export class CrearActividadPorMecanicaComponent implements OnInit {

  formularioActividadPorMecanica: FormGroup;
  @Output() datosActividadPorMecanica: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() actividadPorMecanica: ActividadPorMecanicaInterface;

  actividades: ActividadInterface[];

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _actividadService: ActividadService
  ) {
    this.formularioActividadPorMecanica = new FormGroup({
      actividadMecanica: new FormControl(''),
      detalleActividad: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$')
      ])
    });
  }

  arregloMensajesDeErrorActividadMecanica: string[] = [];
  arregloMensajesDeErrornuevaActividad: string[] = [];

  mensajesDeErrorActividadMecanica = {
    required: 'Seleccione al menos una actividad'
  };
  mensajesDeErrorNuevaActividad = {
    pattern: 'Campo nueva actividad debe contener solo letras.'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.listarActividades();
    this.escucharCampo('actividadMecanica', this.arregloMensajesDeErrorActividadMecanica, this.mensajesDeErrorActividadMecanica);
    this.escucharCampo('detalleActividad', this.arregloMensajesDeErrornuevaActividad, this.mensajesDeErrorNuevaActividad);
  }

  escucharFormulario() {
    this.formularioActividadPorMecanica
      .valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(
        (valoresDeFormulario: ActividadPorMecanicoInterface) => {
          const esValido = this.formularioActividadPorMecanica.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosActividadPorMecanica.emit(valoresDeFormulario);
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
            this.datosActividadPorMecanica.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioActividadPorMecanica.get(nombreCampo);
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
        }, error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo escuchar campo',
            timeout: 1500,
            showCloseButton: true
          });
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

  enviarFormularioMecanica() {
    this.formularioActividadPorMecanica;
  }

  // // llenar select
  listarActividades() {
    this._actividadService.consultarActividades(0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividades = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar actividades',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

}
