import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PartyMember } from '../party/entity/party-member.entity';
import { Party } from '../party/entity/party.entity';
import { PartyService } from '../party/party.service';
import { User } from '../user/entity/user.entity';
import { WishList } from '../user/entity/wish-list.entity';
import { UserService } from '../user/user.service';
import { Review } from './entity/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review, User, WishList, Party, PartyMember]), AuthModule],
    controllers: [ReviewController],
    providers: [ReviewService, UserService, PartyService],
})
export class ReviewModule {}
