import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Education } from './models/education.entity';


@Injectable()
export class EducationService extends AbstractService {
    constructor(@InjectRepository(Education) private readonly educationRepository: Repository<Education>){
        super(educationRepository)
    }
}
