import { MigrationInterface, QueryRunner } from 'typeorm';

export class providerPaymentLinks1674815346712 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // language=SQL
            `
                CREATE TABLE IF NOT EXISTS provider_payment_links
                (
                    id                  UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                    provider_id         UUID REFERENCES providers (id) ON DELETE CASCADE NOT NULL,
                    stripe_payment_link TEXT                                             NOT NULL,
                    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    archived_at         TIMESTAMP WITH TIME ZONE
                )
        `
        );
        await queryRunner.query(
            // language=SQL
            `
            CREATE INDEX provider_payment_links_provider_idx 
                ON provider_payment_links(provider_id) WHERE archived_at IS NULL 
        `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
