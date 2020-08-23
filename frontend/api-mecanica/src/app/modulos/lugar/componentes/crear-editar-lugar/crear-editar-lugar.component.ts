import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {LugarInterface} from '../../../../interfaces/lugar.interface';

@Component({
  selector: 'app-crear-editar-lugar',
  templateUrl: 'crear-editar-lugar.component.html',
  styleUrls: ['crear-editar-lugar.component.sass']
})
export class CrearEditarLugarComponent implements OnInit {

  formularioLugar: FormGroup;
  @Output() datosLugar: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() lugar: LugarInterface;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router
  ) {
    this.formularioLugar = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*$')
      ])
    });
  }

  // Mensajes de error
  arregloMensajesDeErrorNombre: string[] = [];

  mensajesErrorNombre = {
    required: 'Campo nombre es requerido',
    minlength: 'Campo nombre debe tener minimo 3 letras',
    maxlength: 'Campo nombre debe tener maximo 10 letras',
    pattern: 'Nombre debe tener solo letras.'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.escucharCampoNombre();
    this.llenarFormulario();
  }

  // Escuchar formularios
  escucharFormulario() {
    this.formularioLugar
      .valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(
        valoresDeFormulario => {
          const esValido = this.formularioLugar.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Exito',
              body: 'Formulario correcto.',
              timeout: 1400,
              showCloseButton: true
            });
            this.datosLugar.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'CUIDADO',
              body: 'Formulario con errores.',
              timeout: 1400,
              showCloseButton: true
            });
            this.datosLugar.emit(false);
          }
        }
      );
  }

  escucharCampoNombre() {
    const campoNombre$ = this.formularioLugar.get('nombre');
    campoNombre$
      .valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(
        campoNombre => {
          this.llenarMensajesErrorNombre(campoNombre$);
        }
      );
  }


  // llenar mensajes de error
  llenarMensajesErrorNombre(controlNameNombre: AbstractControl) { // recibo todo el input
    this.arregloMensajesDeErrorNombre = [];
    if ((controlNameNombre.dirty || controlNameNombre.touched) && controlNameNombre.errors) {
      this.arregloMensajesDeErrorNombre = Object.keys(controlNameNombre.errors)
        .map((llave) => {
          return this.mensajesErrorNombre[llave];
        });
    }
  }

  enviarFormularioReactivo() {
    this.formularioLugar;
  }

  llenarFormulario() {
    if (this.lugar) {
      this.formularioLugar.setValue({nombre: this.lugar.nombre});
    }
  }
}
