import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from 'typeorm';

import * as slugify from 'slug';
import { User } from 'src/user/models/user.entity';
import { classToPlain } from 'class-transformer';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @ManyToMany((type) => User, (user) => user.favourites, { eager: true })
  @JoinColumn()
  favourited_by: User[];

  @RelationCount((article: Article) => article.favourited_by)
  favourites_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne((type) => User, (user) => user.articles, { eager: true })
  author: User;

  @Column('simple-array')
  tag_list: string[];

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON() {
    return classToPlain(this);
  }

  toArticle(user: User) {
    let favourited = null;
    if (user) {
      favourited = this.favourited_by.includes(user);
    }
    const article: any = this.toJSON();
    delete article.favourited_by;

    return { ...article, favourited };
  }
}
