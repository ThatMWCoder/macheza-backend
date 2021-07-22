import { Member } from 'src/member/models/member.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  education_institution: string;

  @Column()
  qualification: string;

  @Column()
  started_from: string;

  @Column()
  finished_in: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  created_by?: User;
}
