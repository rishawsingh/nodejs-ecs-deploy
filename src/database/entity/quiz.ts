import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'quiz' })
export default class Quiz extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'provider_slug' })
    providerSlug: string;

    @Column({ nullable: false, name: 'member_id' })
    memberId: string;

    @Column({ nullable: true, name: 'payment_link_checkout_id' })
    paymentLinkCheckoutId: string;

    @Column({ nullable: true, name: 'completed_on' })
    completedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
