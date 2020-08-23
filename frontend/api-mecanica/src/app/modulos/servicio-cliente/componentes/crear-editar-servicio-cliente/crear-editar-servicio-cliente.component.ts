import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicioInterface} from '../../../../interfaces/servicio.interface';
import {ToasterService} from 'angular2-toaster';
import {VehiculoService} from '../../../../servicios/vehiculo/vehiculo.service';
import {debounceTime} from 'rxjs/operators';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {VehiculoInterface} from '../../../../interfaces/vehiculo.interface';
import {CookieService} from 'ngx-cookie';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {MecanicaInterface} from '../../../../interfaces/mecanica.interface';
import {MecanicaService} from '../../../../servicios/mecanica/mecanica.service';

@Component({
  selector: 'app-crear-editar-servicio-cliente',
  templateUrl: 'crear-editar-servicio-cliente.component.html',
  styleUrls: ['crear-editar-servicio-cliente.component.sass']
})
export class CrearEditarServicioClienteComponent implements OnInit {

  formularioServicio: FormGroup;
  @Output() datosServicio: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() servicio: ServicioInterface;
  servicios: ServicioInterface[] = [];
  vehiculos: VehiculoInterface [] = [];
  mecanicas: MecanicaInterface [] = [];
  vehiculo: VehiculoInterface;
  idCliente: number;
  verDetalle = false;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _cookieService: CookieService,
    private readonly _mecanicaService: MecanicaService
  ) {
    this.recuperarIdClienteDeCookie();
    this.listarVehiculos();
    this.formularioServicio = new FormGroup({
      detalle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      mecanica: new FormControl('', [
        Validators.required
      ]),
      costo: new FormControl(''),
      estado: new FormControl(''),
      placa: new FormControl(''),
      anio: new FormControl(''),
      descripcion: new FormControl(''),
      vehiculo: new FormControl('', [
        Validators.required,
      ])
    });
  }

  arregloMensajesDeErrorDetalle: string[] = [];
  arregloMensajesDeErrorVehiculo: string[] = [];
  arregloMensajesDeErrorMecanica: string[] = [];

  mensajesDeErrorDetalle = {
    required: 'Campo detalle es requerido',
    minlength: 'Campo detalle debe tener minimo 3 letras',
    maxlength: 'Campo detalle debe tener maximo 30 letras',
    pattern: 'Detalle debe tener solo letras.'
  };

  mensajesDeErrorVehiculo = {
    required: 'Campo descripcion es requerido'
  };

  mensajesDeErrorMecanica = {
    required: 'Campo mecanica es requerido.'
  };

  ngOnInit() {
    this.escucharFormulario();
    this.listarVehiculos();
    this.listarMecanicas();
    this.llenarFormularioServicio();
    this.escucharCampo('detalle', this.arregloMensajesDeErrorDetalle, this.mensajesDeErrorDetalle);
    this.escucharCampo('vehiculo', this.arregloMensajesDeErrorVehiculo, this.mensajesDeErrorVehiculo);
    this.escucharCampo('mecanica', this.arregloMensajesDeErrorMecanica, this.mensajesDeErrorMecanica);
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

  enviarFormularioServicio() {
    this.formularioServicio;
  }

  llenarFormularioServicio() {
    if (this.servicio) {
      this.listarVehiculoPorId(this.servicio.vehiculo);
      this.verDetalle = true;
      this._vehiculoService.obtenerVehiculoPorId(this.servicio.vehiculo)
        .subscribe(
          (respuesta) => {
            this.formularioServicio.setValue({
              detalle: this.servicio.detalle,
              costo: this.servicio.costo,
              estado: this.servicio.estado,
              anio: this.vehiculo.anio,
              placa: this.vehiculo.placa,
              descripcion: this.vehiculo.descripcion,
              vehiculo: this.vehiculo.placa,
              mecanica: ' '
            });
          },
          error => {
          }
        );
    }
  }

  listarVehiculos() {
    this._vehiculoService.obtenerVehiculoPorCliente(0, 100, {id: this.idCliente})
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.vehiculos = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se ha listado vehiculos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarVehiculoPorId(idVehiuclo: number) {
    this._vehiculoService.obtenerVehiculoPorId(idVehiuclo)
      .subscribe(
        (respuesta) => {
          this.vehiculo = respuesta;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se ha listado vehiculos por cliente.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarMecanicas() {
    this._mecanicaService.obtnerMecanicasConLugar(0, 100)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicas = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se ha listado mecanicos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  recuperarIdClienteDeCookie() {
    const datos: UsuarioInterface = JSON.parse(this._cookieService.get('usuario-logeado'));
    this.idCliente = Number(datos.id);
  }
}
