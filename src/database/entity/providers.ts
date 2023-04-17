import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'providers' })
export class Providers extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'name' })
    name: string;

    @Column({ nullable: false, name: 'practice_name' })
    practiceName: string;

    @Column({ nullable: false, name: 'practice_slug' })
    practiceSlug: string;

    @Column({ nullable: false, name: 'email' })
    @Index({ unique: true, where: 'archived_at IS NULL' })
    email: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
