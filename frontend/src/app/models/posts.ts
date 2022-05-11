import { ObjectId } from "mongodb";

export interface posts {
    title: string
    content?: string
    photoid?: string
    audioid?: string
    userid: ObjectId
    type: string
    likes?: number
    comments?: number
    commentsid?: ObjectId
    _id?: string
}