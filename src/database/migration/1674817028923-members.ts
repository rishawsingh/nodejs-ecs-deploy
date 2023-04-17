import { MigrationInterface, QueryRunner } from 'typeorm';

export class members1674817028923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // language=SQL
            `
                CREATE TABLE IF NOT EXISTS members
                (
                    id           UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                    name         TEXT   NOT NULL,
                    email        CITEXT NOT NULL,
                    phone_number TEXT   NOT NULL,
                    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    archived_at  TIMESTAMP WITH TIME ZONE
                )
            `
        );
        await queryRunner.query(
            // language=SQL
            `
            CREATE INDEX unique_members ON members(trim(lower(email))) WHERE archived_at IS NULL
        `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
