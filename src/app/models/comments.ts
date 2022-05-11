import { ObjectId } from "mongodb";

export interface comments {
    text: string
    userid: ObjectId
}