import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentLinkCheckouts1674817043464 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // language=SQL
            `
                CREATE TABLE IF NOT EXISTS payment_link_checkouts
                (
                    id                    UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                    member_id             UUID REFERENCES members (id) ON DELETE CASCADE NOT NULL,
                    stripe_payment_link   TEXT                                           NOT NULL,
                    stripe_payment_intent TEXT                                           NOT NULL,
                    amount                INT                                            NOT NULL,
                    tos_accepted          BOOLEAN                  DEFAULT FALSE,
                    created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    archived_at           TIMESTAMP WITH TIME ZONE
                )
            `
        );
        await queryRunner.query(
            // language=SQL
            `CREATE INDEX payment_link_checkouts_member_idx ON payment_link_checkouts (member_id) WHERE archived_at IS NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
