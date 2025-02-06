import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { createZodDto, ZodValidationPipe } from "nestjs-zod";
import { z } from "zod";

import { Public } from "@/infra/auth/decorator/public.decorator";
import { SaveOnVectorStoreUseCase } from "@/rag/application/usecases/save";

const objectSchema = z.object({
    content: z.string(),
    metadata: z.object({
        category: z.string(),
        date: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/)
            .optional(), // Fecha en formato YYYY-MM-DD
        source: z.string().optional(), // Fuente de la información, url, enlace, resolución
        tags: z.array(z.string()), // Etiquetas adicionales
        schedule: z.array(z.string()).optional(),
    }),
});

const BodySchema = z.object({ information: z.array(objectSchema) });

class BodyDto extends createZodDto(BodySchema)
{}

@Public()
@Controller("rag/save")
export class SaveController
{
    constructor(private readonly saveUseCase: SaveOnVectorStoreUseCase)
    {}

    @Post()
    @HttpCode(200)
    @UsePipes(ZodValidationPipe)
    async handle(@Body() body: BodyDto): Promise<any>
    {
        try
        {
            await this.saveUseCase.execute(body.information);

            return { message: "Saved successfully" };
        }
        catch (error)
        {
            console.error("Error saving information:", error);
            throw error;
        }
    }
}
