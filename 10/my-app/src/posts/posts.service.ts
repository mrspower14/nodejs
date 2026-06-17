import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostsService {

  private posts: Post[] = [
    {id: 1, title: "첫번째 글", content: "안녕하세요", author: "김철수"}
  ];

  private nextId = 2;

  create(createPostDto: CreatePostDto) {
    //return 'This action adds a new post';
    const post: Post = {
      id: this.nextId++,
      title: createPostDto.title,
      content: createPostDto.content,
      author: createPostDto.author ?? "익명"
    }

    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`게시물 ${id}를 찾을 수 없습니다.`);
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    //return `This action updates a #${id} post`;
    const post = this.findOne(id);
    if (updatePostDto.title !== undefined ) post.title = updatePostDto.title;
    if (updatePostDto.content !== undefined ) post.content = updatePostDto.content;
    if (updatePostDto.author !== undefined ) post.author = updatePostDto.author;
  
    return post;
  }

  remove(id: number) {
    //return `This action removes a #${id} post`;
    const index = this.posts.findIndex((p)=> p.id === id);
    if (index === -1) throw new NotFoundException(`게시물 ${id} 없어요.`);

    const [removed] = this.posts.splice(index, 1);
    return removed;
  }


}
