import { MigrationInterface, QueryRunner } from 'typeorm';

export class providers1627292360258 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS citext;`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS providers
            (
                id            UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                name          TEXT   NOT NULL,
                practice_name TEXT   NOT NULL,
                practice_slug TEXT   NOT NULL,
                email         CITEXT NOT NULL,
                created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                archived_at   TIMESTAMP WITH TIME ZONE
            );
        `);
        await queryRunner.query(
            // language=SQL
            `CREATE INDEX unique_provider_email ON providers(trim(lower(email))) WHERE archived_at IS NULL`
        );
        await queryRunner.query(
            // language=SQL
            `CREATE INDEX unique_provider_slug ON providers(trim(lower(practice_slug))) WHERE archived_at IS NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
