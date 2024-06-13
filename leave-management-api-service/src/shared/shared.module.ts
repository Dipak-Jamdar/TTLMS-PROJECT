import { Module } from "@nestjs/common";

//If you add any service add that service in providers
const providers = []
@Module({
    providers: providers,
    imports: [],
    exports: [...providers]
})
export class SharedModule{ }