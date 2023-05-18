import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from 'src/schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    try {
      const createdBlog = new this.blogModel(createBlogDto);
      return createdBlog.save();
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        throw new ConflictException('User with this email already exists');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  findAll() {
    return this.blogModel.find();
  }

  findOne(id: string) {
    const blog = this.blogModel.findById(id);
    if (blog) {
      return blog;
    }
    throw new HttpException(
      'This blog ID does not exists',
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto);
  }

  remove(id: string) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
