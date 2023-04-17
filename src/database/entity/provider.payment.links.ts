import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'provider_payment_links' })
export class ProviderPaymentLinks extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'provider_id' })
    providerId: string;

    @Column({ nullable: false, name: 'stripe_payment_link' })
    stripePaymentLink: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
