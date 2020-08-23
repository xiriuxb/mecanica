import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {VehiculoInterface} from '../../../../interfaces/vehiculo.interface';
import {ToasterService} from 'angular2-toaster';
import {VehiculoService} from '../../../../servicios/vehiculo/vehiculo.service';
import {CookieService} from 'ngx-cookie';
import {debounceTime} from 'rxjs/operators';
import {ARREGLO_ESTADO_VEHICULO} from '../../../../constantes/datos-de-select/arreglo.estados.vehiculo';
import {mascaraDinero} from '../../../../constantes/mascaras/mascara.dinero';
import {MecanicoPorMecanicaService} from '../../../../servicios/mecanico-por-mecanica/mecanico-por-mecanica.service';
import {ActivatedRoute} from '@angular/router';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ServicioService} from '../../../../servicios/servicio/servicio.service';

@Component({
  selector: 'app-crear-servicio-mecanica',
  templateUrl: 'crear-servicio-mecanica.component.html',
  styleUrls: ['crear-servicio-mecanica.component.sass']
})
export class CrearServicioMecanicaComponent implements OnInit {

  formularioServicio: FormGroup;
  @Output() datosServicio: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() servicio: ServicioInterface;
  servicios: ServicioInterface [] = [];
  mecanicos: any [] = [];
  vehiculo: VehiculoInterface;
  idCliente: number;
  verDetalle = false;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _cookieService: CookieService,
    private readonly _mecanicoPorMecanicaService: MecanicoPorMecanicaService,
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _servicioService: ServicioService
  ) {
    this.formularioServicio = new FormGroup({
      detalle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      costo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 ]*[.][0-9 ]{2}|[0-9 ]*$'),
        this.validaCosto(0, 'costoValido')
      ]),
      estado: new FormControl(''),
      placa: new FormControl(''),
      anio: new FormControl(''),
      descripcion: new FormControl(''),
      vehiculo: new FormControl(''),
      mecanico: new FormControl('', [
        Validators.required
      ])
    });
  }

  arregloMensajesDeErrorDetalle: string[] = [];
  arregloMensajesDeErrorVehiculo: string[] = [];
  arregloMensajesDeErrorCredito: string[] = [];

  mensaesDeErrorCredito = {
    required: 'Campo dinero es requerido',
    pattern: 'Debe ingresar solo numeros.',
    costoValido: 'Debe colocar un valor al servicio.'
  };

  mensajesDeErrorDetalle = {
    required: 'Campo detalle es requerido',
    minlength: 'Campo detalle debe tener minimo 3 letras',
    maxlength: 'Campo detalle debe tener maximo 100 letras',
    pattern: 'Detalle debe tener solo letras.'
  };

  mensajesDeErrorVehiculo = {
    required: 'Campo descripcion es requerido'
  };
  estados: string [] = [...ARREGLO_ESTADO_VEHICULO];
  mascaraDineroCosto = mascaraDinero;

  ngOnInit() {
    this.escucharFormulario();
    this.llenarFormularioServicio();
    this.escucharCampo('detalle', this.arregloMensajesDeErrorDetalle, this.mensajesDeErrorDetalle);
    this.escucharCampo('vehiculo', this.arregloMensajesDeErrorVehiculo, this.mensajesDeErrorVehiculo);
    this.escucharCampo('costo', this.arregloMensajesDeErrorCredito, this.mensaesDeErrorCredito);
  }

  escucharFormulario() {
    this.formularioServicio
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: ServicioInterface) => {
          const esValido = this.formularioServicio.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosServicio.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosServicio.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioServicio.get(nombreCampo);
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
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pud escuchar campos.',
            timeout: 1500,
            showCloseButton: true
          });
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

  validaCosto(valor: number, costoValido) {
    return (campo: AbstractControl): { [atributo: string]: boolean } | null => {
      const campoCostoValido = campo.value > valor;
      if (campoCostoValido) {
        return null;
      } else {
        const objError = {};
        objError[costoValido] = true;
        return objError;
      }
    };
  }

  enviarFormularioServicio() {
    this.formularioServicio;
  }

  llenarFormularioServicio() {
    if (this.servicio) {
      this.recuperarIdClientePorServicio(this.servicio.id);
      this.idCliente = this.servicio.usuario;
      this.verDetalle = true;
      this._vehiculoService.obtenerVehiculoPorId(this.servicio.vehiculo)
        .subscribe(
          (respuesta: VehiculoInterface) => {
            this.formularioServicio.setValue({
              detalle: this.servicio.detalle,
              costo: this.servicio.costo,
              estado: this.servicio.estado,
              anio: respuesta.anio,
              placa: respuesta.placa,
              descripcion: respuesta.descripcion,
              vehiculo: respuesta.placa,
              mecanico: ''
            });
          },
          error => {
          }
        );
    }
  }

  recuperarIdClientePorServicio(idServicio: number) {
    this._servicioService.obtnerIdMecanicaPorServicio(idServicio)
      .subscribe(
        (respuesta: any) => {
          this.listarMecanicosPorMecanica(respuesta.mecanica.id);
        },
        error => {
        }
      );
  }

  listarMecanicosPorMecanica(idMecanica: number) {

    this._mecanicoPorMecanicaService.obtenerMecanicoPorMecanica(idMecanica, 0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicos = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar mecanicos por mecanica',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}

