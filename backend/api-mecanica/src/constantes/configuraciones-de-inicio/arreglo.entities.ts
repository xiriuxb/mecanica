import { LugarEntity } from '../../lugar/lugar.entity';
import { MecanicaEntity } from '../../mecanica/mecanica.entity';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';
import { TurnoEntity } from '../../turno/turno.entity';
import { ServicioEntity } from '../../servicio/servicio.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { VehiculoEntity } from '../../vehiculo/vehiculo.entity';
import { RolEntity } from '../../rol/rol.entity';
import { HistorialDeCreditoEntity } from '../../historial-de-credito/historial-de-credito.entity';
import { CreditoEntity } from '../../credito/credito.entity';
import { MecanicaPorMecanicoEntity } from '../../mecanica-por-mecanico/mecanica-por-mecanico.entity';
import { TurnoPorMecanicaEntity } from '../../turno-por-mecanica/turno-por-mecanica.entity';
import { TurnoPorUsuarioEntity } from '../../turnos-por-usuario/turno-por-usuario.entity';
import { MecanicoPorServicioEntity } from '../../mecanico-por-servicio/mecanico-por-servicio.entity';
import { ServicioPorUsuarioEntity } from '../../servicio-por-usuario/servicio-por-usuario.entity';
import { ClientePorMecanicaEntity } from '../../clientes-por-mecanica/cliente-por-mecanica.entity';
import { RolPorUsuarioEntity } from '../../rol-por-usuario/rol-por-usuario.entity';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadEntity } from '../../actividades/actividad.entity';
import { ActividadPorMecanicoEntity } from '../../actividad-por-mecanico/actividad-por-mecanico.entity';
import { ActividadPorMecanicaEntity } from '../../actividad-po-mecanica/actividad-por-mecanica.entity';

export const ARREGLO_ENTITIES = [
  LugarEntity,
  MecanicaEntity,
  MecanicoEntity,
  TurnoEntity,
  ServicioEntity,
  UsuarioEntity,
  VehiculoEntity,
  RolEntity,
  HistorialDeCreditoEntity,
  CreditoEntity,
  MecanicaPorMecanicoEntity,
  TurnoPorMecanicaEntity,
  TurnoPorUsuarioEntity,
  MecanicoPorServicioEntity,
  ServicioPorUsuarioEntity,
  ClientePorMecanicaEntity,
  RolPorUsuarioEntity,
  ClaseGenericaEntity,
  ActividadEntity,
  ActividadPorMecanicoEntity,
  ActividadPorMecanicaEntity,
];
