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

  url_menu = 'http://localhost:4001/menu'
  url_photo = 'http://localhost:4001/menu/photos'
  url_audio = 'http://localhost:4001/menu/audio'

  createdPost: Posts =  {
    title: '',
    content: '',
    photoid: JSON.parse(JSON.stringify('b')),
    audioid: JSON.parse(JSON.stringify('b')),
    userid: JSON.parse(JSON.stringify('a')),
    likes: 0,
    comments: 0,
    commentsid: JSON.parse(JSON.stringify('a')),
  };
  
  putPhoto(posts: Posts){
    console.log(posts)
    console.log(posts.photoid)
    return this.http.post(this.url_photo, posts.photoid)
  }

  putAudio(audio: Object){
    return this.http.post(this.url_audio, audio)
  }

  createPost(posts: Posts, userid: string){
    const idstring = JSON.stringify(userid)
    const iduserpost = JSON.parse(idstring)
    
    posts.userid=iduserpost
    return this.http.post(this.url_menu, posts)
  }
}
