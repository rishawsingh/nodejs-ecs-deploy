import { MigrationInterface, QueryRunner } from 'typeorm';

export class quiz1674824716024 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // language=SQL
            `
                CREATE TABLE IF NOT EXISTS quiz
                (
                    id                       UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                    provider_slug            TEXT                                                          NOT NULL,
                    member_id                UUID REFERENCES members (id) ON DELETE CASCADE                NOT NULL,
                    payment_link_checkout_id UUID REFERENCES payment_link_checkouts (id) ON DELETE CASCADE DEFAULT NULL,
                    completed_on             TIMESTAMP WITH TIME ZONE DEFAULT NULL,
                    created_at               TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    archived_at              TIMESTAMP WITH TIME ZONE
                )
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
