import { IsEmail } from 'class-validator';
import { User } from 'src/user/models/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  family_name: string;

  @Column()
  given_names: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fax?: string;

  @Column('boolean', { nullable: true })
  is_active: boolean = true;

  @Column('boolean', {  nullable: true })
  is_approved?: boolean = false;

  @ManyToOne(()=>User)
  @JoinColumn({name: "user_id"})
  created_by?: User

}
