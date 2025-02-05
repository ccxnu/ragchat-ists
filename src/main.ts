import { NestFactory } from "@nestjs/core";

import { EnvService } from "@/infra/env/env.service";

import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./interface/common/filters/all-exception.filter";
import { HttpExceptionFilter } from "./interface/common/filters/http-exception.filter";
import { LoggingInterceptor } from "./interface/common/interceptors/logger.interceptor";
//import { SwaggerSetting } from './interface/swagger';

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, { logger: ["error", "warn"] });

    // Env constants
    const envService = app.get(EnvService);
    const GLOBAL_PREFIX = envService.get("GLOBAL_PREFIX");

    // Enable Cors
    app.enableCors();

    // Filter
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());

    // Interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Base routing
    app.setGlobalPrefix(GLOBAL_PREFIX);

    // Documentation
    //SwaggerSetting(app);

    await app.listen(3000, "0.0.0.0");
    console.info(`Service running on port 3000 ^~^`);
}

bootstrap();
