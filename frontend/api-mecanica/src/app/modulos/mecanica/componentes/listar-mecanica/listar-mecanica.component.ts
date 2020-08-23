import {Component, OnInit} from '@angular/core';
import {MecanicaInterface} from '../../../../interfaces/mecanica.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {MecanicaService} from '../../../../servicios/mecanica/mecanica.service';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {ModalCrearEditarMecanicaComponent} from '../../modal/modal-crear-editar-mecanica/modal-crear-editar-mecanica.component';

@Component({
  selector: 'app-listar-mecanica',
  templateUrl: 'listar-mecanica.component.html',
  styleUrls: ['listar-mecanica.component.sass']
})
export class ListarMecanicaComponent implements OnInit {

  mecanicas: MecanicaInterface [] = [];
  columnas: any [] = [
    {field: 'nombreMecanica', header: 'NOMBRE', width: '6rem'},
    {field: 'telefonoMecanica', header: 'TELEFONO', width: '6rem'},
    {field: 'lugar', header: 'CIUDAD', width: '6rem'},
    {field: 'direccionMecanica', header: 'DIRECCION', width: '6rem'},
    {field: 'estadoMecanica', header: 'ESTADO', width: '6rem'},
    {field: 'id', header: 'OPERACIONES', width: '10rem'},
  ];
  registrosTotales: number;
  nombreABuscar: string;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _mecanicaService: MecanicaService
  ) {
  }

  ngOnInit() {
    this.listarMecanicas();
  }

  listarMecanicas() {
    this._mecanicaService.obtnerMecanicasConLugar(0, 3)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicas = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._mecanicaService
      .obtnerMecanicasConLugar(evento.first, 3)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicas = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cambiarEstadoMecanica(mecanica: MecanicaInterface) {
    const idMecanica = mecanica.id;
    const nuevoEstado = !mecanica.estadoMecanica;
    const mecanicaActualizada = {
      estadoMecanica: nuevoEstado
    };
    this._mecanicaService.actualizarMecanica(mecanicaActualizada, idMecanica)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Se cambio el estado');
          mecanica.estadoMecanica = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );
  }

  guardarMecanica(datos: MecanicaInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const lugar: any = datos.lugar;
      const idLugar = lugar.id;
      const query = {
        nombreMecanica: datos.nombreMecanica,
        telefonoMecanica: datos.telefonoMecanica,
        descripcionMecanica: datos.descripcionMecanica,
        direccionMecanica: datos.direccionMecanica,
        lugar: idLugar
      };
      this._mecanicaService.guardarMecanica(query)
        .subscribe(
          (respuesta: any) => {
            this.listarMecanicas();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Mecanica guardada con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo gaurdar mecanica.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  editarMecanica(datos: MecanicaInterface, idMecanica: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const lugar: any = datos.lugar;
      const idLugar = lugar.id;
      const query = {
        nombreMecanica: datos.nombreMecanica,
        telefonoMecanica: datos.telefonoMecanica,
        descripcionMecanica: datos.descripcionMecanica,
        direccionMecanica: datos.direccionMecanica,
        lugar: idLugar
      };
      this._mecanicaService.actualizarMecanica(query, idMecanica)
        .subscribe(
          (respuesta: any) => {
            this.listarMecanicas();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Mecanica editada con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo editar mecanica.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  abrirModalCrear() {
    const modalCrearMecanica$ = this._dialog.open(
      ModalCrearEditarMecanicaComponent, {
        width: '35rem',
        data: false
      }
    );

    modalCrearMecanica$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.guardarMecanica(respuesta);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se abrir modal mecanica.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(filaMecanica: MecanicaInterface) {
    const modalEditar$ = this._dialog.open(
      ModalCrearEditarMecanicaComponent, {
        width: '35rem',
        data: filaMecanica
      }
    );
    modalEditar$
      .afterClosed()
      .subscribe(
        (respuesta: MecanicoInterface) => {
          this.editarMecanica(respuesta, filaMecanica.id);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se abrir modal mecanica.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarActividades(idMecanica: number) {
    this._router.navigate([`mecanica/actividad-por-mecanica/listar/${idMecanica}`]);
  }

  listarMecanicos(idMecanica: number) {
    this._router.navigate([`mecanica/mecanico-por-mecanica/listar/${idMecanica}`]);
  }

  servicioMecanica(idMecanica: number) {
    this._router.navigate([`mecanica/servicio-mecanica/listar/${idMecanica}`]);
  }

  filtrarPorNombre() {

  }
}
