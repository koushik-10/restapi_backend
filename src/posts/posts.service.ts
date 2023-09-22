import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(id: string, payload: CreatePostDto) {
    try {
      const categories = payload.categories?.map((category) => ({
        id: category,
      }));

      return this.prismaService.post.create({
        data: {
          ...payload,

          author: { connect: { id } },

          categories: { connect: categories },
        },
      });
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prismaService.post.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          title: true,
          body: true,
          author: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.post.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch post with ID ${id}: ${error.message}`);
    }
  }

  async update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    try {
      return await this.prismaService.post.update({
        where: { id },

        data: updatePostDto,
      });
    } catch (error) {
      throw new Error(`Failed to update post with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.post.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete post with ID ${id}: ${error.message}`);
    }
  }
}
