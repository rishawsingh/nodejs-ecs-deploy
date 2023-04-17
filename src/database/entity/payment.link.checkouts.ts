import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_link_checkouts' })
export default class PaymentLinkCheckouts extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'member_id' })
    memberId: string;

    @Column({ nullable: false, name: 'stripe_payment_link' })
    stripePaymentLink: string;

    @Column({ nullable: false, name: 'stripe_payment_intent' })
    stripePaymentIntent: string;

    @Column({ nullable: false, name: 'amount' })
    amount: number;

    @Column({ nullable: false, name: 'tos_accepted' })
    tosAccepted: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
