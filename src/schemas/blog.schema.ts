import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

export type Comments = {
  userName: string;
  comment: string;
};

@Schema()
export class Blog {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  brief: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  comments: Comments[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.path('title').validate((value: string) => {
  return value && value.trim().length > 0;
}, 'Title is required');
