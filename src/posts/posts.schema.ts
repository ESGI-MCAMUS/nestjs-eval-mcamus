import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const posts = z.object({
  id: z.string().uuid(),
  title: z.string().max(50),
  body: z.string(),
});

export const createPost = posts.pick({ title: true, body: true });

export const updatePost = posts.partial().pick({ title: true, body: true });

export class CreatePostDto extends createZodDto(createPost) {
  @ApiProperty({
    description: "The title of the post",
    example: "My first post",
    type: String,
  })
  title: string;

  @ApiProperty({
    description: "The body of the post",
    example: "This is my first post",
    type: String,
  })
  body: string;
}

export class UpdatePostDto extends createZodDto(updatePost) {
  @ApiProperty({
    description: "The title of the post",
    example: "My first post",
    type: String,
  })
  title: string;

  @ApiProperty({
    description: "The body of the post",
    example: "This is my first post",
    type: String,
  })
  body: string;
}

export class PostDto extends createZodDto(posts) {}
