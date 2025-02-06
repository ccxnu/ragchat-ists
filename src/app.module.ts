import { Module } from "@nestjs/common";

import { AuthModule } from "@/infra/auth/auth.module";
import { HttpModule } from "@/interface/http/http.module";
import { RagModule } from "@/rag/rag.module";

@Module({
    imports: [AuthModule, HttpModule, RagModule],
})
export class AppModule
{}
