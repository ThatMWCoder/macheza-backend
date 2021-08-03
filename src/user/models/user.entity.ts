import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @ManyToMany(type=>User, user=>user.followee)
  @JoinTable()
  followers:User[]

  @ManyToMany(type=>User, user=>user.followers)
  followee:User[]

  toJSON(){
    return classToPlain(this)
  }

  toProfile(user: User){
    const following = this.followers.includes(user)
    const profile: any = this.toJSON()
    delete profile.followers

    return{...profile, following}
  }
  
}
