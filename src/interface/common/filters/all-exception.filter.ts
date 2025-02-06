import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter
{
    catch(exception: any, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();

        const errorResponse = {
            code: "COD_ERROR_SERVICE",
            result: {},
            info: "Ocurrió un error, intenta más tarde.",
            status: false,
        };

        console.log(errorResponse.code, exception);

        response.status(500).json(errorResponse);
    }
}
