import { ObjectId } from "mongodb";

export interface posts {
    title: string
    content?: string
    photoid?: ObjectId
    audioid?: ObjectId
    userid: ObjectId
    likes?: number
    comments?: number
    commentsid?: ObjectId
    _id?: string
}