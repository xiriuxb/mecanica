import {Component, OnInit} from '@angular/core';
import {MecanicoInterface} from '../../../../interfaces/mecanico.interface';
import {MecanicoService} from '../../../../servicios/mecanico-service/mecanico.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ModalCrearEditarMecanicoComponent} from '../../modal/modal-crear-editar-mecanico.component';
import {ActividadPorMecanicoService} from '../../../../servicios/actividad-por-mecanico/actividad-por-mecanico.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listar-mecanico',
  templateUrl: 'listar-mecanico.component.html',
  styleUrls: ['listar-mecanico.component.sass']
})
export class ListarMecanicoComponent implements OnInit {

  mecanicos: MecanicoInterface [] = [];
  columnas: any [] = [
    {field: 'nombreMecanico', header: 'NOMBRE', width: '6rem'},
    {field: 'apellidoMecanico', header: 'APELLIDO', width: '6rem'},
    {field: 'cedulaMecanico', header: 'CEDULA', width: '6rem'},
    {field: 'telefonoMecanico', header: 'TELEFONO', width: '6rem'},
    {field: 'estadoCivilMecanico', header: 'ESTADO CIVIL', width: '6rem'},
    {field: 'estadoMecanico', header: 'ESTADO', width: '5rem'},
    {field: 'id', header: 'OPERACIONES', width: '10rem'},
  ];
  registrosTotales: number;
  idsActividades: number[];
  nombreABuscar: string;

  constructor(
    private readonly _mecanicoService: MecanicoService,
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _actividadPorMecanicoService: ActividadPorMecanicoService,
    private readonly _router: Router
  ) {
  }

  ngOnInit() {
    this.listarMecanicos();
  }

  listarMecanicos() {
    this._mecanicoService.obtenerMecanico(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicos = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'ERROR',
            body: 'No se pudo cargar datos.',
            timeout: 1400,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._mecanicoService
      .obtenerMecanico(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.mecanicos = respuesta.data;
        }
      );
  }

  guardarMecanico(datos: MecanicoInterface) {
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
      this._mecanicoService.guardarMecanico(query)
        .subscribe(
          (respuesta: any) => {
            this.guardarActividadPorMecanico(respuesta.id, this.idsActividades);
            this.listarMecanicos();
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
              body: 'No se pudo guardar a mecanico.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  guardarActividadPorMecanico(idMecanico: number, idsActividad: number[]) {
    for (const id of idsActividad) {
      const query = {
        mecanico: idMecanico,
        actividad: id
      };
      this._actividadPorMecanicoService.guardarActividadPorMecanico(query)
        .subscribe(valor => {
            this._toasterService.pop({
              type: 'success',
              title: 'Guardado',
              body: 'Actividad de mecanico guardada con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo guardar actividad de mecanico.',
              timeout: 1500,
              showCloseButton: true
            });
          });

    }
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
            this.listarMecanicos();
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

  abrirModalCrear() {
    const modalCrearMecanico$ = this._dialog.open(
      ModalCrearEditarMecanicoComponent, {
        width: '35rem',
        data: false
      }
    );

    modalCrearMecanico$
      .afterClosed()
      .subscribe(
        (respuesta: any) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            this.idsActividades = respuesta.actividadPorMecanico.map(valor => valor.id);
            this.guardarMecanico(respuesta);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo abrir modal mecanico.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(filaMecanico: MecanicoInterface) {
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
            body: 'No se pudo abrir modal mecanico.',
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

  listarActividades(idMecanico: number) {
    this._router.navigate([`/mecanico/actividad-por-mecanico/${idMecanico}`]);
  }

  filtrarPorNombre() {

  }
}
