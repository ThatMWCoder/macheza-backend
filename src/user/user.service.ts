import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(
    page: number = 1,
    relations: any[] = [],
  ): Promise<PaginatedResult> {
    const { data, meta } = await super.paginate(page, relations);

    return {
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta,
    };
  }

  async followUser(currentUser: User, first_name: string) {
    const user = await this.userRepository.findOne({
      where: { first_name },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }
  async unfollowUser(currentUser: User, first_name: string) {
    const user = await this.userRepository.findOne({
      where: { first_name },
      relations: ['followers'],
    });
    user.followers = user.followers.filter(
      (follower) => follower !== currentUser,
    );
    await user.save();
    return user.toProfile(currentUser);
  }
}
