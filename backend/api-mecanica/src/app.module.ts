import { InternalServerErrorException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIGURACIONES } from './constantes/configuraciones-de-inicio/configuraciones';
import { ARREGLO_ENTITIES } from './constantes/configuraciones-de-inicio/arreglo.entities';
import { ARREGLO_MODULOS } from './constantes/configuraciones-de-inicio/arreglo.modulos';
import { LugarService } from './lugar/lugar.service';
import { CargarDatos } from './funciones/cargar.datos.de.prueba';
import { TurnoService } from './turno/turno.service';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { RolService } from './rol/rol.service';
import { CreditoService } from './credito/credito.service';
import { UsuarioService } from './usuario/usuario.service';
import { RolPorUsuarioService } from './rol-por-usuario/rol-por-usuario.service';
import { HistoriaDeCreditoService } from './historial-de-credito/historia-de-credito.service';
import { MecanicaService } from './mecanica/mecanica.service';
import { MecanicoService } from './mecanico/mecanico.service';
import { TurnoPorMecanicaService } from './turno-por-mecanica/turno-por-mecanica.service';
import { MecanicaPorMecanicoService } from './mecanica-por-mecanico/mecanica-por-mecanico.service';
import { ServicioService } from './servicio/servicio.service';
import { ClientePorMecanicaService } from './clientes-por-mecanica/cliente-por-mecanica.service';
import { MecanicoPorServicioService } from './mecanico-por-servicio/mecanico-por-servicio.service';
import { TurnoPorUsuarioService } from './turnos-por-usuario/turno-por-usuario.service';
import { ServicioPorUsuarioService } from './servicio-por-usuario/servicio-por-usuario.service';
import { ActividadService } from './actividades/actividad.service';
import { ActividadPorMecanicaService } from './actividad-po-mecanica/actividad-por-mecanica.service';
import { ActividadPorMecanicoService } from './actividad-por-mecanico/actividad-por-mecanico.service';

@Module({
  imports: [
    ...ARREGLO_MODULOS,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: CONFIGURACIONES.bdd.host,
      port: CONFIGURACIONES.bdd.port,
      name: CONFIGURACIONES.bdd.name,
      connectTimeout: 20000,
      username: CONFIGURACIONES.bdd.username,
      password: CONFIGURACIONES.bdd.password,
      database: CONFIGURACIONES.bdd.database,
      entities: [...ARREGLO_ENTITIES],
      // synchronize: CONFIGURACIONES.bdd.synchronize,
      // dropSchema: CONFIGURACIONES.bdd.dropSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly _lugarService: LugarService,
    private readonly _turnoService: TurnoService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _rolService: RolService,
    private readonly _creditoService: CreditoService,
    private readonly _usuarioService: UsuarioService,
    private readonly _rolPorUsuarioService: RolPorUsuarioService,
    private readonly _historialService: HistoriaDeCreditoService,
    private readonly _mecanicaService: MecanicaService,
    private readonly _mecanicoService: MecanicoService,
    private readonly _turnoPorMecanicaService: TurnoPorMecanicaService,
    private readonly _mecanicoPorMecanicaService: MecanicaPorMecanicoService,
    private readonly _servicioService: ServicioService,
    private readonly _clientePorMecanicaService: ClientePorMecanicaService,
    private readonly _mecanicoPorServicioService: MecanicoPorServicioService,
    private readonly _turnoPorUsuarioService: TurnoPorUsuarioService,
    private readonly _servicioPorUsuarioService: ServicioPorUsuarioService,
    private readonly _actividadService: ActividadService,
    private readonly _actividadPorMecanicaService: ActividadPorMecanicaService,
    private readonly _actividadPorMecanicoService: ActividadPorMecanicoService,
  ) {
    CONFIGURACIONES.crearDatosDePrueba
      ? this.crearDatos()
      : console.info('NO CREAR DATOS DE PRUEBA');
  }

  async crearDatos() {
    try {
      await CargarDatos(
        'src/datos-de-prueba/actividad.json',
        this._actividadService,
      );
      // console.log('Se creo actividad');
      await CargarDatos('src/datos-de-prueba/lugar.json', this._lugarService);
      // console.log('Se creo lugar');
      await CargarDatos(
        'src/datos-de-prueba/mecanica.json',
        this._mecanicaService,
      );
      // console.log('Se creo mecanica');
      await CargarDatos(
        'src/datos-de-prueba/turno-por-mecanica.json',
        this._turnoPorMecanicaService,
      );
      // console.log('Se creo turno por mecanica');
      await CargarDatos('src/datos-de-prueba/turno.json', this._turnoService);
      // console.log('Se creo turno');
      await CargarDatos(
        'src/datos-de-prueba/usuario.json',
        this._usuarioService,
      );
      // console.log('Se creo usuario');
      await CargarDatos(
        'src/datos-de-prueba/vehiculo.json',
        this._vehiculoService,
      );
      // console.log('Se creo vehiculo');
      await CargarDatos('src/datos-de-prueba/rol.json', this._rolService);
      // console.log('Se creo rol');
      await CargarDatos(
        'src/datos-de-prueba/credito.json',
        this._creditoService,
      );
      // console.log('Se creo credito');
      await CargarDatos(
        'src/datos-de-prueba/rol-por-usuario.json',
        this._rolPorUsuarioService,
      );
      // console.log('Se creo rol por usuario');
      await CargarDatos(
        'src/datos-de-prueba/historia-de-credito.json',
        this._historialService,
      );
      // console.log('Se creo historial de credito');
      await CargarDatos(
        'src/datos-de-prueba/mecanico.json',
        this._mecanicoService,
      );
      // console.log('Se creo mecanico');
      await CargarDatos(
        'src/datos-de-prueba/mecanica-por-mecanico.json',
        this._mecanicoPorMecanicaService,
      );
      // console.log('Se creo mecanico por mecanica');
      await CargarDatos(
        'src/datos-de-prueba/servicio.json',
        this._servicioService,
      );
      // console.log('Se creo servicio');
      await CargarDatos(
        'src/datos-de-prueba/cliente-por-mecanica.json',
        this._clientePorMecanicaService,
      );
      // console.log('Se creo cliente por mecanica');
      await CargarDatos(
        'src/datos-de-prueba/mecanico-por-servicio.json',
        this._mecanicoPorServicioService,
      );
      // console.log('Se creo mecanico por servicio');
      await CargarDatos(
        'src/datos-de-prueba/turno-por-usuario.json',
        this._turnoPorUsuarioService,
      );
      // console.log('Se creo turno por usuario');
      await CargarDatos(
        'src/datos-de-prueba/servicio-por-usuario.json',
        this._servicioPorUsuarioService,
      );
      // console.log('Se creo servicio por usuario');
      await CargarDatos(
        'src/datos-de-prueba/actividad-por-mecanico.json',
        this._actividadPorMecanicoService,
      );
      // console.log('Se creo actividad por mecanico');
      await CargarDatos(
        'src/datos-de-prueba/actividad-por-mecanica.json',
        this._actividadPorMecanicaService,
      );
      // console.log('Se creo actividad por mecanica');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
