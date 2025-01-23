import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Public } from '@/infra/auth/decorator/public.decorator';

import { RagService } from '../../applications/rag.service';

const schema = z.object({
  query: z.string(),
})

class BodyDto extends createZodDto(schema)
{}

@Public()
@Controller('rag')
export class RagController
{
  constructor(private service: RagService)
  {}

	@HttpCode(200)
  @Post('chat')
  async ask(@Body() body: BodyDto): Promise<any>
  {
    const conversation = await this.service.ask(body.query);
    //return toDivRow(conversation);
    return conversation;
  }
}
