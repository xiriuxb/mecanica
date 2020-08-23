import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { RolEntity } from './rol.entity';
import { CrearRolDto } from './rol-dto/crear-rol.dto';
import { EditarRolDto } from './rol-dto/editar-rol.dto';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController extends ClaseGenericaController<RolEntity> {
  crearDto = CrearRolDto;
  editarDto = EditarRolDto;

  constructor(private readonly _rolService: RolService) {
    super(_rolService);
  }
}
