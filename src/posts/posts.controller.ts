import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from '../guards/me.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../util/index';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id, email }, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(id, createPostDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    //console.log(query);
    return this.postsService.findAll(isEmpty(userId) ? null : userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map((category) => ({
      id: category,
    }));

    return this.postsService.update(id, {
      ...updatePostDto,

      categories: { set: categories },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
