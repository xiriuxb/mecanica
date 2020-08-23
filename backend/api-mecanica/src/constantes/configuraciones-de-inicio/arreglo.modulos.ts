import { UsuarioModule } from '../../usuario/usuario.module';
import { ClientePorMecanicaModule } from '../../clientes-por-mecanica/cliente-por-mecanica.module';
import { CreditoModule } from '../../credito/credito.module';
import { HistoriaDeCreditoModule } from '../../historial-de-credito/historia-de-credito.module';
import { LugarModule } from '../../lugar/lugar.module';
import { MecanicaModule } from '../../mecanica/mecanica.module';
import { MecanicaPorMecanicoModule } from '../../mecanica-por-mecanico/mecanica-por-mecanico.module';
import { MecanicoModule } from '../../mecanico/mecanico.module';
import { MecanicoPorServicioModule } from '../../mecanico-por-servicio/mecanico-por-servicio.module';
import { RolModule } from '../../rol/rol.module';
import { RolPorUsuarioModule } from '../../rol-por-usuario/rol-por-usuario.module';
import { ServicioModule } from '../../servicio/servicio.module';
import { ServicioPorUsuarioModule } from '../../servicio-por-usuario/servicio-por-usuario.module';
import { TurnoModule } from '../../turno/turno.module';
import { TurnoPorMecanicaModule } from '../../turno-por-mecanica/turno-por-mecanica.module';
import { TurnoPorUsuarioModule } from '../../turnos-por-usuario/turno-por-usuario.module';
import { VehiculoModule } from '../../vehiculo/vehiculo.module';
import { ActividadModule } from '../../actividades/actividad.module';
import { ActividadPorMecanicaModule } from '../../actividad-po-mecanica/actividad-por-mecanica.module';
import { ActividadPorMecanicoModule } from '../../actividad-por-mecanico/actividad-por-mecanico.module';
import { WebsocketModule } from '../../websocket-servicio/websocket.module';

export const ARREGLO_MODULOS = [
  UsuarioModule,
  ClientePorMecanicaModule,
  CreditoModule,
  HistoriaDeCreditoModule,
  LugarModule,
  MecanicaModule,
  MecanicaPorMecanicoModule,
  MecanicoModule,
  MecanicoPorServicioModule,
  RolModule,
  RolPorUsuarioModule,
  ServicioModule,
  ServicioPorUsuarioModule,
  TurnoModule,
  TurnoPorMecanicaModule,
  TurnoPorUsuarioModule,
  VehiculoModule,
  ActividadModule,
  ActividadPorMecanicaModule,
  ActividadPorMecanicoModule,
  WebsocketModule,
];
