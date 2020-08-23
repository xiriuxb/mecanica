import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {MecanicoService} from '../../../../servicios/mecanico-service/mecanico.service';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {ARREGLO_ESTADOS_CIVILES} from '../../../../constantes/datos-de-select/arreglo.estados.civiles';
import {mascaraCedula} from '../../../../constantes/mascaras/mascara.cedula';
import {mascaraTelefono} from '../../../../constantes/mascaras/mascara.telefono';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ActividadService} from '../../../../servicios/actividad/actividad.service';
import {ActividadInterface} from '../../../../interfaces/actividad.interface';

@Component({
  selector: 'app-crear-editar-mecanico',
  templateUrl: 'crear-editar-mecanico.component.html',
  styleUrls: ['crear-editar-mecanico.component.sass']
})
export class CrearEditarMecanicoComponent implements OnInit {

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _mecanicoService: MecanicoService,
    private readonly _router: Router,
    private readonly _actividadService: ActividadService
  ) {
    this.listarActividades();
    this.formularioMecanico = new FormGroup({
      nombreMecanico: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      apellidoMecanico: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      telefonoMecanico: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(14),
        Validators.pattern(/\([0-9]{3}\)[ ][0-9]{3}[-][0-9]{3,4}|[0-9]{9,10}/)
      ]),
      cedulaMecanico: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]{9}[-][0-9]{1}|[0-9]{10}/)
      ]),
      actividadPorMecanico: new FormControl('', [
        Validators.required
      ]),
      estadoCivilMecanico: new FormControl('', [
        Validators.required
      ])
    });
  }

  formularioMecanico: FormGroup;
  @Output() datosMecanico: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() mecanico: MecanicoInterface;

  estadosCiviles: string[] = [...ARREGLO_ESTADOS_CIVILES];
  actividades: ActividadInterface[] = [];

  // Mensajes de error
  arregloMensajesDeErrorNombre: string[] = [];
  arregloMensajesDeErrorApellido: string[] = [];
  arregloMensajesDeErrorTelefono: string[] = [];
  arregloMensajesDeErrorCedula: string[] = [];
  arregloMensajesDeErrorEstadoCivil: string[] = [];
  arregloMensajesDeErrorActividad: string[] = [];

  mensajesDeErrorNombre = {
    required: 'Campo nombre es requerido',
    minlength: 'Campo nombre debe tener minimo 3 letras',
    maxlength: 'Campo nombre debe tener maximo 15 letras',
    pattern: 'Nombre debe tener solo letras.'
  };

  mensajesDeErrorApellido = {
    required: 'Campo apellido es requerido',
    minlength: 'Campo apellido debe tener minimo 3 letras',
    maxlength: 'Campo apellido debe tener maximo 15 letras',
    pattern: 'Apellido debe tener solo letras.'
  };

  mensaesDeErrorTelefono = {
    required: 'Campo telefono es requerido',
    minlength: 'Campo telefono debe tener minimo 9 numeros',
    maxlength: 'Campo telefono debe tener maximo 10 numeros',
    pattern: 'Telefono debe tener solo numeros.'
  };

  mensajesDeErrorCedula = {
    required: 'Campo cedula es requerido',
    minlength: 'Campo cedula debe tener 10 numeros',
    maxlength: 'Campo cedula debe tener 10 numeros',
    pattern: 'Cedula debe tener solo numeros.'
  };

  mensajesDeErrorEstadoCivil = {
    required: 'Campo estado civil es requerido'
  };

  mensajesDeErrorActividad = {
    required: 'Debe seleccionar al menos una actividad del mecanico.'
  };

  // Mascaras
  mascaraCedulaMecanico = mascaraCedula;
  mascaraTelefonoMecanico = mascaraTelefono;

  ngOnInit() {
    this.escucharFormulario();
    this.llenarFormularioMecanico();
    this.escucharCampo('nombreMecanico', this.arregloMensajesDeErrorNombre, this.mensajesDeErrorNombre);
    this.escucharCampo('apellidoMecanico', this.arregloMensajesDeErrorApellido, this.mensajesDeErrorApellido);
    this.escucharCampo('telefonoMecanico', this.arregloMensajesDeErrorTelefono, this.mensaesDeErrorTelefono);
    this.escucharCampo('cedulaMecanico', this.arregloMensajesDeErrorCedula, this.mensajesDeErrorCedula);
    this.escucharCampo('estadoCivilMecanico', this.arregloMensajesDeErrorEstadoCivil, this.mensajesDeErrorEstadoCivil);
    this.escucharCampo('actividadPorMecanico', this.arregloMensajesDeErrorActividad, this.mensajesDeErrorActividad);
  }

  // Escuchar formulario
  escucharFormulario() {
    this.formularioMecanico
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: MecanicoInterface) => {
          const esValido = this.formularioMecanico.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            valoresDeFormulario.telefonoMecanico = valoresDeFormulario.telefonoMecanico.replace(/\D+/g, '');
            valoresDeFormulario.cedulaMecanico = valoresDeFormulario.cedulaMecanico.replace(/[-]+/g, '');
            this.datosMecanico.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosMecanico.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioMecanico.get(nombreCampo);
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
  enviarFormularioMecanico() {
    this.formularioMecanico;
  }

  llenarFormularioMecanico() {
    if (this.mecanico) {
      this.formularioMecanico.setValue({
        nombreMecanico: this.mecanico.nombreMecanico,
        apellidoMecanico: this.mecanico.apellidoMecanico,
        telefonoMecanico: this.mecanico.telefonoMecanico,
        cedulaMecanico: this.mecanico.cedulaMecanico,
        estadoCivilMecanico: this.mecanico.estadoCivilMecanico,
        actividadPorMecanico: false
      });
    }
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
