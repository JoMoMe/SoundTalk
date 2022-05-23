import { ObjectId } from "mongodb";

export interface messages {
    text: string
    userid: ObjectId
    _id?: string
}