import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { posts as Posts } from 'src/app/models/posts';
import { comments as Comments } from 'src/app/models/comments';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, public router: Router) {}

  url_menu = 'http://localhost:4005/menu'
  url_photo = 'http://localhost:4005/menu/photos'
  url_audio = 'http://localhost:4005/menu/audio'

  createdPost: Posts =  {
    title: '',
    content: '',
    photoid: JSON.parse(JSON.stringify('a')),
    audioid: JSON.parse(JSON.stringify('a')),
    userid: JSON.parse(JSON.stringify('a')),
    likes: 0,
    comments: 0,
    commentsid: JSON.parse(JSON.stringify('a')),
    type: '',
  };

  createdComment: Comments =  {
    text: '',
    userid: JSON.parse(JSON.stringify('a')),
  };
  
  putPhoto(photo: any){
    const PhotoForm = new FormData();
    PhotoForm.append('image', photo)
    return this.http.post(this.url_photo, PhotoForm)
  }

  putAudio(audio: any){
    const audioForm = new FormData();
    audioForm.append('track', audio)
    return this.http.post(this.url_audio, audioForm)
  }

  getPhoto(id: string){
    return this.http.get('http://localhost:4005/menu/photos/'+id)
  }

  getAudio(id: string){
    return this.http.get('http://localhost:4005/menu/audio/'+id, {responseType: 'blob'})
  }

  createPost(posts: Posts, userid: string, audioid: string, photoid: string){
    const idstring = JSON.stringify(userid)
    const iduserpost = JSON.parse(idstring)

    const audiostring = JSON.stringify(audioid)
    const idaudio = JSON.parse(audiostring)

    const photostring = JSON.stringify(photoid)
    const idphoto = JSON.parse(photostring)
    
    posts.userid=iduserpost
    posts.type="meme"
    posts.audioid=idaudio
    posts.photoid=idphoto
    return this.http.post(this.url_menu, posts)
  }

  createComment(comments: Comments, userid: string){
    const idstring = JSON.stringify(userid)
    const idusercomment = JSON.parse(idstring)

    comments.userid=idusercomment
    return this.http.post('http://localhost:4005/menu/comment', comments)
  }

  putCommentinPost(postid: string, commentid: Object){
    const commenttostring = JSON.stringify(commentid)
    const idofcomment = JSON.parse(commenttostring)
    
    const commentForm = new FormData();
    commentForm.append('commentsid', idofcomment)
    console.log("LA ID CON LA QUE BUSCAMOS EL POST", postid)
    console.log("EL COMENTARIO QUE VAMOS A ACTUALIZAR EN EL PUT",commentForm)

    return this.http.put('http://localhost:4005/menu/comment/'+postid, commentForm)
  }
}
