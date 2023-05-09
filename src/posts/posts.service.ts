import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { CreatePostDto, UpdatePostDto } from "./posts.schema";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.posts.create({ data: createPostDto });

    return { success: true, message: `Post ${post.id} created successfully` };
  }

  async findAll() {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({ where: { id } });

    console.log(post);

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });

    return { success: true, message: `Post ${post.id} updated successfully` };
  }

  async remove(id: string) {
    try {
      const post = await this.prisma.posts.delete({ where: { id } });

      return { success: true, message: `Post ${post.id} deleted successfully` };
    } catch (error) {
      switch (error.meta.cause) {
        case "Record to delete does not exist.":
          throw new NotFoundException(error.meta.cause);
          break;

        default:
          throw new BadRequestException(error.meta.cause);
          break;
      }
    }
  }
}
