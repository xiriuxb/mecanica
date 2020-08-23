import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {MecanicaService} from '../../../../servicios/mecanica/mecanica.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MecanicaInterface} from '../../../../interfaces/mecanica.interface';
import {LugarInterface} from '../../../../interfaces/lugar.interface';
import {mascaraTelefono} from '../../../../constantes/mascaras/mascara.telefono';
import {debounceTime} from 'rxjs/operators';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {LugarService} from '../../../../servicios/lugar-service/lugar.service';

@Component({
  selector: 'app-crear-editar-mecanica',
  templateUrl: 'crear-editar-mecanica.component.html',
  styleUrls: ['crear-editar-mecanica.component.sass']
})
export class CrearEditarMecanicaComponent implements OnInit {

  formularioMecanica: FormGroup;
  @Output() datosMecanica: EventEmitter<object | boolean> = new EventEmitter<object|boolean>();
  @Input() mecanica: MecanicaInterface;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _mecanicaService: MecanicaService,
    private readonly _lugarService: LugarService
  ) {
    this.listarLugares();
    this.formularioMecanica = new FormGroup({
      nombreMecanica: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      telefonoMecanica: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(14),
        Validators.pattern(/\([0-9]{3}\)[ ][0-9]{3}[-][0-9]{3,4}|[0-9]{9,10}/)
      ]),
      descripcionMecanica: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      lugar: new FormControl('', [
        Validators.required
      ]),
      direccionMecanica: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  lugares: LugarInterface[] = [];
  mascaraTelefonoMecanica = mascaraTelefono;

  arregloMensajesDeErrorNombre: string[] = [];
  arregloMensajesDeErrorDescripcion: string[] = [];
  arregloMensajesDeErrorDireccion: string[] = [];
  arregloMensajesDeErrorTelefono: string[] = [];
  arregloMensajesDeErrorLugar: string[] = [];

  mensajesDeErrorNombre = {
    required: 'Campo nombre es requerido',
    minlength: 'Campo nombre debe tener minimo 3 letras',
    maxlength: 'Campo nombre debe tener maximo 15 letras',
    pattern: 'Nombre debe tener solo letras.'
  };

  mensajesDeErrorDescripcion = {
    required: 'Campo descripcion es requerido',
    minlength: 'Campo descripcion debe tener minimo 3 letras',
    maxlength: 'Campo descripcion debe tener maximo 50 letras',
  };

  mensajesDeErrorDireccion = {
    required: 'Campo descripcion es requerido',
    minlength: 'Campo descripcion debe tener minimo 3 letras',
    maxlength: 'Campo descripcion debe tener maximo 50 letras',
  };

  mensajesDeErrorTelefono = {
    required: 'Campo telefono es requerido',
    minlength: 'Campo telefono debe tener minimo 9 numeros',
    maxlength: 'Campo telefono debe tener maximo 10 numeros',
    pattern: 'Telefono debe tener solo numeros.'
  };

  mensajesDeErrorLugar = {
    required: 'Campo lugar es requerido'
  };

  ngOnInit() {
    this.llenarFormularioMecanica();
    this.escucharFormulario();
    this.escucharCampo('nombreMecanica', this.arregloMensajesDeErrorNombre, this.mensajesDeErrorNombre);
    this.escucharCampo('telefonoMecanica', this.arregloMensajesDeErrorTelefono, this.mensajesDeErrorTelefono);
    this.escucharCampo('descripcionMecanica', this.arregloMensajesDeErrorDescripcion, this.mensajesDeErrorDescripcion);
    this.escucharCampo('direccionMecanica', this.arregloMensajesDeErrorDireccion, this.mensajesDeErrorDireccion);
    this.escucharCampo('lugar', this.arregloMensajesDeErrorLugar, this.mensajesDeErrorLugar);
  }

  escucharFormulario() {
    this.formularioMecanica
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: MecanicaInterface) => {
          const esValido = this.formularioMecanica.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            valoresDeFormulario.telefonoMecanica = valoresDeFormulario.telefonoMecanica.replace(/\D+/g, '');
            this.datosMecanica.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosMecanica.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioMecanica.get(nombreCampo);
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

  enviarFormularioMecanica() {
    this.formularioMecanica;
  }

  llenarFormularioMecanica() {
    if (this.mecanica) {
      this.formularioMecanica.setValue({
        nombreMecanica: this.mecanica.nombreMecanica,
        telefonoMecanica: this.mecanica.telefonoMecanica,
        descripcionMecanica: this.mecanica.descripcionMecanica,
        lugar: this.mecanica.lugar,
        direccionMecanica: this.mecanica.direccionMecanica
      });
    }
  }

  listarLugares() {
    this._lugarService.obtenerLugar(0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.lugares = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar lugares',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}
