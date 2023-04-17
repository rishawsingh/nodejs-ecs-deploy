import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'members' })
export default class Members extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, name: 'name' })
    name: string;

    @Column({ nullable: false, name: 'email' })
    email: string;

    @Column({ nullable: false, name: 'phone_number' })
    phoneNumber: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'archived_at' })
    archivedAt: Date;
}
