import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { posts as Posts } from 'src/app/models/posts';
import { comments as Comments } from 'src/app/models/comments';
import { likes as Likes } from 'src/app/models/likes';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, public router: Router) {}

  url_menu = 'http://localhost:4000/menu'
  url_photo = 'http://localhost:4000/menu/photos'
  url_audio = 'http://localhost:4000/menu/audio'

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
    return this.http.get('http://localhost:4000/menu/photos/'+id)
  }

  getAudio(id: string){
    return this.http.get('http://localhost:4000/menu/audio/'+id, {responseType: 'blob'})
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

  putCommentinPost(comments: Comments, userid: string, postid: string){
    const idstring = JSON.stringify(userid)
    const idusercomment = JSON.parse(idstring)

    comments.userid=idusercomment
    return this.http.post('http://localhost:4000/menu/posts/'+postid+'/comment', comments)
  }

  putLikeinPost(userid: string, postid: string){
    const iduser = {'id': userid};
    return this.http.post('http://localhost:4000/menu/posts/'+postid+'/like', iduser)
  }

  deleteComment(commentid: string, postid: string){
    return this.http.delete('http://localhost:4000/menu/posts/'+postid+'/comment/'+commentid)
  }

  getCommentsOfThePost(comments: Comments, userid: string, postid: string){
    const idstring = JSON.stringify(userid)
    const idusercomment = JSON.parse(idstring)

    comments.userid=idusercomment
    return this.http.post('http://localhost:4000/menu/posts/'+postid+'/comment', comments)
  }
}
