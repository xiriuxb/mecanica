import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {ARREGLO_ESTADOS_CIVILES} from '../../../../constantes/datos-de-select/arreglo.estados.civiles';
import {mascaraCedula} from '../../../../constantes/mascaras/mascara.cedula';
import {mascaraTelefono} from '../../../../constantes/mascaras/mascara.telefono';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-crear-editar-cliente',
  templateUrl: 'crear-editar-cliente.component.html',
  styleUrls: ['crear-editar-cliente.component.sass']
})
export class CrearEditarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  @Output() datosCliente: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() cliente: UsuarioInterface;

  constructor(
    private readonly _toasterService: ToasterService
  ) {
    this.formularioCliente = new FormGroup({
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      apellidoUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      telefonoUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(14),
        Validators.pattern(/\([0-9]{3}\)[ ][0-9]{3}[-][0-9]{3,4}|[0-9]{9,10}/)
      ]),
      cedulaUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]{9}[-][0-9]{1}|[0-9]{10}/)
      ]),
      estadoCivilUsuario: new FormControl('', [
        Validators.required
      ]),
      direccionUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  // Select
  estadosCiviles: string[] = [...ARREGLO_ESTADOS_CIVILES];

  // Mascaras
  mascaraCedulaUsuario = mascaraCedula;
  mascaraTelefonoUsuario = mascaraTelefono;

  arregloMensajesDeErrorNombre: string[] = [];
  arregloMensajesDeErrorApellido: string[] = [];
  arregloMensajesDeErrorTelefono: string[] = [];
  arregloMensajesDeErrorCedula: string[] = [];
  arregloMensajesDeErrorEstadoCivil: string[] = [];
  arregloMensajesDeErrorDireccion: string[] = [];

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

  mensajesDeErrorDireccion = {
    required: 'Campo direccion es requerido',
    minlength: 'Campo direccion debe tener al menos 3 caracteres.',
  };

  ngOnInit() {
    this.escucharFormulario();
    this.llenarFormularioUsuario();
    this.escucharCampo('nombreUsuario', this.arregloMensajesDeErrorNombre, this.mensajesDeErrorNombre);
    this.escucharCampo('apellidoUsuario', this.arregloMensajesDeErrorApellido, this.mensajesDeErrorApellido);
    this.escucharCampo('telefonoUsuario', this.arregloMensajesDeErrorTelefono, this.mensaesDeErrorTelefono);
    this.escucharCampo('cedulaUsuario', this.arregloMensajesDeErrorCedula, this.mensajesDeErrorCedula);
    this.escucharCampo('estadoCivilUsuario', this.arregloMensajesDeErrorEstadoCivil, this.mensajesDeErrorEstadoCivil);
    this.escucharCampo('direccionUsuario', this.arregloMensajesDeErrorDireccion, this.mensajesDeErrorDireccion);
  }

  escucharFormulario() {
    this.formularioCliente
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: UsuarioInterface) => {
          const esValido = this.formularioCliente.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            valoresDeFormulario.telefonoUsuario = valoresDeFormulario.telefonoUsuario.replace(/\D+/g, '');
            valoresDeFormulario.cedulaUsuario = valoresDeFormulario.cedulaUsuario.replace(/[-]+/g, '');
            this.datosCliente.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosCliente.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioCliente.get(nombreCampo);
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
  enviarFormularioCliente() {
    this.formularioCliente;
  }

  llenarFormularioUsuario() {
    if (this.cliente) {
      this.formularioCliente.setValue({
        nombreUsuario: this.cliente.nombreUsuario,
        apellidoUsuario: this.cliente.apellidoUsuario,
        telefonoUsuario: this.cliente.telefonoUsuario,
        cedulaUsuario: this.cliente.cedulaUsuario,
        estadoCivilUsuario: this.cliente.estadoCivilUsuario,
        direccionUsuario: this.cliente.direccionUsuario
      });
    }
  }
}
