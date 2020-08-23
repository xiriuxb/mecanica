import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActividadPorMecanicoInterface} from '../../../../interfaces/actividad.por.mecanico.interface';
import {ActividadInterface} from '../../../../interfaces/actividad.interface';
import {debounceTime} from 'rxjs/operators';
import {ActividadService} from '../../../../servicios/actividad/actividad.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-crear-editar-actividad-por-mecanico',
  templateUrl: 'crear-editar-actividad-por-mecanico.component.html',
  styleUrls: ['crear-editar-actividad-por-mecanico.component.sass']
})
export class CrearEditarActividadPorMecanicoComponent implements OnInit {

  formularioActividadPorMecanico: FormGroup;
  @Output() datosActividadPorMecanico: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() activdadPorMecanico: ActividadPorMecanicoInterface;

  actividades: ActividadInterface[];

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _actividadService: ActividadService
  ) {
    this.listarActividades();
    this.formularioActividadPorMecanico = new FormGroup({
      actividadMecanico: new FormControl('', [
       // Validators.required
      ]),
      detalleActividad: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$')
      ])
    });
  }

  arregloMensajesDeErrorActividadMecanico: string[] = [];
  arregloMensajesDeErrornuevaActividad: string[] = [];

  mensajesDeErrorActividadMecanico = {
    required: 'Seleccione al menos una actividad'
  };
  mensajesDeErrorNuevaActividad = {
    pattern: 'Campo nueva actividad debe contener solo letras.'
  };

  ngOnInit(): void {
    this.escucharFormulario();
    this.escucharCampo('actividadMecanico', this.arregloMensajesDeErrorActividadMecanico, this.mensajesDeErrorActividadMecanico);
    this.escucharCampo('detalleActividad', this.arregloMensajesDeErrornuevaActividad, this.mensajesDeErrorNuevaActividad);
  }

  escucharFormulario() {
    this.formularioActividadPorMecanico
      .valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(
        (valoresDeFormulario: ActividadPorMecanicoInterface) => {
          const esValido = this.formularioActividadPorMecanico.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1800,
              showCloseButton: true
            });
            this.datosActividadPorMecanico.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop(
              {
                type: 'warning',
                title: 'Cuidado',
                body: 'Formulario con errores',
                timeout: 1800,
                showCloseButton: true
              }
            );
            this.datosActividadPorMecanico.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioActividadPorMecanico.get(nombreCampo);
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
    this.formularioActividadPorMecanico;
  }

  // // llenar select
  listarActividades() {
    this._actividadService.consultarActividades(0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividades = respuesta.data;
        },
        error => {
        }
      );
  }

}
