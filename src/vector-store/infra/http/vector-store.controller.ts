import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Public } from '@/infra/auth/decorator/public.decorator';

import { VectorStoreService } from '../../application/vector-store.service';

const objectSchema = z.object({
  content: z.string(),
  metadata: z.object({
    category: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), // Fecha en formato YYYY-MM-DD
    source: z.string().optional(), // Fuente de la información, url, enlace, resolución
    tags: z.array(z.string()), // Etiquetas adicionales
    schedule: z.array(z.string()).optional(),
  }),
});

const BodySchema = z.object({
  information: z.array(objectSchema), // Lista de fragmentos de anuncios
});

class BodyDto extends createZodDto(BodySchema)
{}

@Public()
@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController
{
  constructor(private readonly service: VectorStoreService)
  {}

	@HttpCode(200)
  @Post('save')
  async handle(@Body() body: BodyDto): Promise<any>
  {
    try
    {
      await this.service.saveDocuments(body.information);

      return { message: 'Saved successfully' };
    }
    catch (error)
    {
      console.error('Error saving information:', error);
      throw error;
    }
  }
}
