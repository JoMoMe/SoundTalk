import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { posts as Posts } from 'src/app/models/posts';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, public router: Router) {}

  url_menu = 'http://localhost:4005/menu'

  createdPost: Posts =  {
    title: '',
    content: '',
    photofile: '',
    audiofile: '',
    userid: JSON.parse(JSON.stringify('a')),
    likes: 0,
    comments: 0,
    commentsid: JSON.parse(JSON.stringify('a')),
  };
  
  createPost(posts: Posts, userid: string){
    const idstring = JSON.stringify(userid)
    const id = JSON.parse(idstring)
    posts.userid=id
    console.log(posts)
    return this.http.post(this.url_menu, posts)
  }
}
