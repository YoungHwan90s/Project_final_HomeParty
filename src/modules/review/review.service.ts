import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/reveiw.entity';
import { ReviewRepository } from './review.repository';


@Injectable()
export class ReviewService {
  // 리뷰 최신순으로 가져오기 위해, 커스텀 리포지터리 만들어서 주입 헐 것
  constructor(
  @InjectRepository(Review) private reviewRepository: ReviewRepository
  ) {}
  
  async writeReview(userId: number, partyId: number, data ) {
      await this.reviewRepository.insert({
        userId,
        partyId,
        rating : data.rating,
        review : data.review,
      });
      return { statusCode: 201, message: "등록 되었습니다." };
  }

  async readReview(partyId: number) {    
    const reviews = await this.reviewRepository.find({
      where: { partyId, deletedAt: null },
      order: { createdAt: "DESC" }
    });
    if (!reviews || reviews.length === 0) {
      throw new Error('잘못된 요청입니다.');
    }
    return reviews;
  }

  async updateReview(reviewId: number, rating: string, review: string) {
        const updatedReview = { rating, review };
    const result = await this.reviewRepository.update(reviewId, updatedReview);
    if (result.affected === 1) {
      return { statusCode: 201, message: "수정 되었습니다." };
    } else {
      return { statusCode: 204, message: "수정 되었습니다." };
    }
  }

  async deleteReview(id: number){
    const deleted = await this.reviewRepository.findOne({
      where : {id},
      select: ["id"]
    });
    if(!deleted){
      return{statusCode:400 , message : "잘못된 요청입니다."}
    }else{
      await this.reviewRepository.softDelete(id)
      return{statusCode:200 , message : "삭제 되었습니다."}
    }
  }

  async getReviewAdmin(partyId: number) {
    const reviews = await this.reviewRepository.find({
        where: { partyId },
        order: { createdAt: "DESC" },
        withDeleted: true
    });
    return reviews;
  }  

  async deleteReviewAdmin(id: number) {
    return await this.reviewRepository.softDelete(id)
  }
}