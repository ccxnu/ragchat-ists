import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { createZodDto, ZodValidationPipe } from "nestjs-zod";
import { z } from "zod";

import { Public } from "@/infra/auth/decorator/public.decorator";
import { ChatUseCase } from "@/rag/application/usecases/chat";

const schema = z.object({
    query: z.string(),
});

class BodyDto extends createZodDto(schema)
{}

@Public()
@Controller("rag/chat")
export class ChatController
{
    constructor(private readonly chatUseCase: ChatUseCase)
    {}

    @Post()
    @HttpCode(200)
    @UsePipes(ZodValidationPipe)
    async handle(@Body() body: BodyDto): Promise<any>
    {
        const conversation = await this.chatUseCase.execute(body.query);
        return conversation;
    }
}
