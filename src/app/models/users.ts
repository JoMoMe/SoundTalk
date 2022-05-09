import { ObjectId } from "mongodb";

export interface users {
    username: string
    password: string
    mail: string
    ubication?: string
    photoid?: ObjectId
    gender?: string
    status?: string
    biography?: string
    accountactive: number
    contactsid?: ObjectId
    role: string
    rememberme?: string
    _id?: ObjectId
}