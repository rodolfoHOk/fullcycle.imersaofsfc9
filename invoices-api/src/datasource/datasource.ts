import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  migrationsTableName: 'store-migrations',
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'store',
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
});

export default AppDataSource;
