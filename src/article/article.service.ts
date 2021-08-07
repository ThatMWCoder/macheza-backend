import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCreateDTO } from 'src/article/models/article-create.dto';
import { User } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { ArticleUpdateDTO } from './models/article-update.dto';
import { Article } from './models/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findBySlug(slug: string) {
    this.articleRepository.findOne({ where: { slug } });
  }

  private ensureOwnership(user: User, article: any): Boolean {
    return article.author.id === user.id;
  }

  async createArticle(user: User, data: ArticleCreateDTO) {
    const article = this.articleRepository.create(data);
    article.author = user;
    await this.articleRepository.save(article);
    return article;
  }

  async updateArticle(slug: string, user: User, data: ArticleUpdateDTO) {
    const article = await this.findBySlug(slug);
    this.ensureOwnership(user, article);
    await this.articleRepository.update({ slug }, data);
    return article;
  }

  async deleteArticle(slug:string, user: User){
      const article= await this.findBySlug(slug)
      this.ensureOwnership(user, article)
      await this.articleRepository.remove(article)
  }
}
