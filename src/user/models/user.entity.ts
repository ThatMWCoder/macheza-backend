import { IsEmail } from 'class-validator';
import { Article } from 'src/article/models/article.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { classToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
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

  @ManyToMany((type) => User, (user) => user.followee)
  @JoinTable()
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers)
  followee: User[];

  @OneToMany((type) => Article, (article) => article.author)
  articles: Article[];

  @ManyToMany((type) => Article, (article) => article.favourited_by)
  @JoinColumn()
  favourites: Article[];


  toProfile(user: User) {
    const following = this.followers.includes(user);
    const profile: any = this.toJSON();
    delete profile.followers;

    return { ...profile, following };
  }

  toJSON(){
    return classToPlain(this);
  }
}
