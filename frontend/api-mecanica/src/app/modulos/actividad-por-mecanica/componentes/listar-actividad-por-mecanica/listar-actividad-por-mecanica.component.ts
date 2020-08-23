import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ActividadService} from '../../../../servicios/actividad/actividad.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ActividadPorMecanicaService} from '../../../../servicios/actividad-por-mecanica/actividad-por-mecanica.service';
// tslint:disable-next-line:max-line-length
import {ModalCrearActividadPorMecanicaComponent} from '../../modal/modal-crear-actividad-por-mecanica/modal-crear-actividad-por-mecanica.component';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-listar-actividad-por-mecanica',
  templateUrl: 'listar-actividad-por-mecanica.component.html',
  styleUrls: ['listar-actividad-por-mecanica.component.sass']
})
export class ListarActividadPorMecanicaComponent implements OnInit {

  idMecanica: number;
  actividadesEnMecanica: string [] = [];
  registrosTotales: number;
  columnas: any [] = [
    {field: 'actividad', header: 'ACTIVIDAD', width: '50px'},
    {field: 'id', header: 'OPERACIONES', width: '50px'},
  ];
  idsActividades: number[] = [];

  constructor(
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _actividadService: ActividadService,
    private readonly _actividadPorMecanicaService: ActividadPorMecanicaService,
    private readonly _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarActividadesPorMecanica();
  }

  private recuperarParametrosDeRuta() {
    this._actvidatedRoute
      .params
      .subscribe(
        parametro => {
          this.idMecanica = parametro.idMecanica;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo recuperar parametros de ruta',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarActividadesPorMecanica() {
    this._actividadPorMecanicaService.actividadesPorMecanica(this.idMecanica, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividadesEnMecanica = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._actividadPorMecanicaService
      .actividadesPorMecanica(this.idMecanica, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.actividadesEnMecanica = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  eliminarActividadPorMecanica(idActividadPorMecanica: number) {
    this._actividadPorMecanicaService
      .eliminarActividadPorMecanica(idActividadPorMecanica)
      .subscribe(
        respuesta => {
          this.listarActividadesPorMecanica();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Se elimino actividad por mecanica con exito',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo eliminar actividad por mecanica',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarActividadPorMecanica(idMecanica: number, idsActividad: number[]) {
    for (const id of idsActividad) {
      const query = {
        mecanica: idMecanica,
        actividad: id
      };
      this._actividadPorMecanicaService.guardarActividadPorMecanica(query)
        .subscribe(valor => {
            this.listarActividadesPorMecanica();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Se guardo actividad por mecanica con exito',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar actividad por mecanica',
              timeout: 1500,
              showCloseButton: true
            });
          });

    }
  }

  guardarActividad(actividad: string) {
    const query = {
      detalleActividad: actividad
    };
    this._actividadService
      .guardarActividad(query)
      .subscribe(
        (valor: any) => {
          this.idsActividades.push(valor.id);
          this.guardarActividadPorMecanica(this.idMecanica, this.idsActividades);
          this.listarActividadesPorMecanica();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Actividad de mecanica guardada con exito.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo guardar actividad',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModaCrear() {
    const modalCrearActividadPorMecanica$ = this._dialog.open(
      ModalCrearActividadPorMecanicaComponent, {
        width: '30rem',
        data: false
      }
    );

    modalCrearActividadPorMecanica$
      .afterClosed()
      .subscribe(
        (respuesta: ActividadPorMecanica) => {
          const tieneDatos = respuesta !== undefined;
          if (tieneDatos) {
            const creoNuevaActividad = respuesta.detalleActividad.trim() !== '';
            this.idMecanica = Number(this.idMecanica);
            const eligioActividades = respuesta.actividadMecanica.length !== 0;
            if (eligioActividades) {
              this.idsActividades = respuesta.actividadMecanica.map((valor: any) => valor.id);
            }
            if (creoNuevaActividad) {
              this.guardarActividad(respuesta.detalleActividad);
            } else {
              this.guardarActividadPorMecanica(this.idMecanica, this.idsActividades);
            }
          }
        },
        error => {
        }
      );
  }
}

export interface ActividadPorMecanica {
  actividadMecanica?: [];
  detalleActividad: string;
}
