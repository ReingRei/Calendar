export class Config {
    credentials_database = {
        type: "sqlite",
        database: "src/database/database.sqlite",
        synchronize: true,
        logging: true,
        entities: ["dist/**/*.entity{.ts,.js}"],
    }
}