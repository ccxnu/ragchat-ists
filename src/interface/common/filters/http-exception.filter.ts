import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();

        const status = exception.getStatus();

        const errorResponse = {
            code: "COD_ERROR_HTTP",
            result: {},
            info: exception.message,
            status: false,
        };

        console.log(errorResponse.code, exception);

        response.status(status).json(errorResponse);
    }
}
