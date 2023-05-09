import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto, UpdatePostDto } from "./posts.schema";
import { ZodValidationPipe } from "nestjs-zod";
import { UUIDValidationPipe } from "src/pipes/uuid.pipe";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts Controller")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreatePostDto })
  create(@Body(ZodValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", UUIDValidationPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(":id")
  @ApiBody({ type: UpdatePostDto })
  update(
    @Param("id", UUIDValidationPipe) id: string,
    @Body(ZodValidationPipe) updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(":id")
  remove(@Param("id", UUIDValidationPipe) id: string) {
    return this.postsService.remove(id);
  }
}
