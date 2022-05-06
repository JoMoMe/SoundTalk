import { ObjectId } from "mongodb";

export interface posts {
    title: string
    content?: string
    photofile?: Object
    audiofile?: Object
    userid: ObjectId
    likes?: number
    comments?: number
    commentsid?: ObjectId
    _id?: string
}