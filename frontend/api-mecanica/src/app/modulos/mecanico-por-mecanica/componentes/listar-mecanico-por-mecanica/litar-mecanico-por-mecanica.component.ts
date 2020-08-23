import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MecanicoService} from '../../../../servicios/mecanico-service/mecanico.service';
import {MecanicoPorMecanicaService} from '../../../../servicios/mecanico-por-mecanica/mecanico-por-mecanica.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
// tslint:disable-next-line:max-line-length
import {ModalCrearMecanicoPorMecanicaComponent} from '../../modal/modal-crear-mecanico-por-mecanica/modal-crear-mecanico-por-mecanica.component';
import {MecanicaInterface} from '../../../../interfaces/mecanica.interface';
import {ToasterService} from 'angular2-toaster';
import {ModalCrearEditarMecanicoComponent} from '../../../mecanico/modal/modal-crear-editar-mecanico.component';

@Component({
  selector: 'app-listar-mecanico-por-mecanica',
  templateUrl: 'litar-mecanico-por-mecanica.component.html',
  styleUrls: ['litar-mecanico-por-mecanica.component.sass']
})
export class LitarMecanicoPorMecanicaComponent implements OnInit {

  idMecanica: number;
  mecanicoPorMecanica: string [] = [];
  registrosTotales: number;
  columnas: any [] = [
    {field: 'nombreMecanico', header: 'NOMBRE', width: '50px'},
    {field: 'apellidoMecanico', header: 'APELLIDO', width: '50px'},
    {field: 'cedulaMecanico', header: 'CEDULA', width: '50px'},
    {field: 'telefonoMecanico', header: 'TELEFONO', width: '50px'},
    {field: 'estadoCivilMecanico', header: 'ESTADO CIVIL', width: '50px'},
    {field: 'estadoMecanico', header: 'ESTADO', width: '50px'},
    {field: 'id', header: 'OPERACIONES', width: '50px'},
  ];

  idsMecanicos: number [] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _mecanicoService: MecanicoService,
    private readonly _mecanicoPorMecanicaService: MecanicoPorMecanicaService,
    private readonly _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarMecanicosPorMecanica();
  }

  private recuperarParametrosDeRuta() {
    this._activatedRoute
      .params
      .subscribe(
        parametro => {
          this.idMecanica = parametro.idMecanica;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo leer parametros de ruta.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  listarMecanicosPorMecanica() {
    this._mecanicoService.obtenerMecanicoPorMecanica(this.idMecanica, 0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicoPorMecanica = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar mecanicos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._mecanicoService
      .obtenerMecanicoPorMecanica(this.idMecanica, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicoPorMecanica = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar mecanicos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  eliminarMecanicoPorMecanica(idMecanico: number) {
    this._mecanicoPorMecanicaService
      .eliminarMecanicoPorMecanica(idMecanico)
      .subscribe(
        respuesta => {
          this.listarMecanicosPorMecanica();
          this._toasterService.pop({
            type: 'success',
            title: 'Exito',
            body: 'Mecanico eliminado con exito.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo eliminar mecanico.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  guardarMecanicoPorMecanica(idMecanica: number, idsMecanico: number[]) {
    for (const id of idsMecanico) {
      const query = {
        mecanica: idMecanica,
        mecanico: id
      };
      this._mecanicoPorMecanicaService.guardarMecanicoPorMecanica(query)
        .subscribe(valor => {
            this.listarMecanicosPorMecanica();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Mecanico guardado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar mecanicos.',
              timeout: 1500,
              showCloseButton: true
            });
          });
    }
  }

  abrirModaAgregarMecanico() {
    const modalCrearMecanicoPorMecanica$ = this._dialog.open(
      ModalCrearMecanicoPorMecanicaComponent, {
        width: '30rem',
        data: false
      }
    );

    modalCrearMecanicoPorMecanica$
      .afterClosed()
      .subscribe(
        (respuesta: MecanicoPorMecanica) => {
          const tieneDatos = respuesta !== undefined;
          if (tieneDatos) {
            this.idMecanica = Number(this.idMecanica);
            this.idsMecanicos = respuesta.mecanicos.map((valor: any) => valor.id);
            this.guardarMecanicoPorMecanica(this.idMecanica, this.idsMecanicos);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal mecanicos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cambiarEstadoMecanico(mecanico: MecanicoInterface) {
    const idMecanico = mecanico.id;
    const nuevoEstado = !mecanico.estadoMecanico;
    const mecanicoActualizado = {
      estadoMecanico: nuevoEstado
    };
    this._mecanicoService.actualizarMecanico(mecanicoActualizado, idMecanico)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Se cambio el estado');
          mecanico.estadoMecanico = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );
  }

  editarMecanico(datos: MecanicoInterface, idMecanico: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      const query = {
        nombreMecanico: datos.nombreMecanico,
        apellidoMecanico: datos.apellidoMecanico,
        telefonoMecanico: datos.telefonoMecanico,
        estadoCivilMecanico: datos.estadoCivilMecanico,
        cedulaMecanico: datos.cedulaMecanico,
        estadoMecanico: datos.estadoMecanico
      };
      this._mecanicoService.actualizarMecanico(query, idMecanico)
        .subscribe(
          (respuesta: any) => {
            this.listarMecanicosPorMecanica();
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Mecanico editado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo editar mecanico.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }
  abrirModalEditarMecanico(filaMecanico) {
    const modalEditar$ = this._dialog.open(
      ModalCrearEditarMecanicoComponent, {
        width: '35rem',
        data: filaMecanico
      }
    );
    modalEditar$
      .afterClosed()
      .subscribe(
        (respuesta: MecanicoInterface) => {
          this.editarMecanico(respuesta, filaMecanico.id);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal editar mecanico.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}

export interface MecanicoPorMecanica {
  mecanicos?: [];
}

