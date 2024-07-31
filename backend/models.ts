import 'dotenv/config'
import { Schema, createConnection } from 'mongoose'
import { User } from './types'

//mongoose -> database이고, 넣을 수 있는 타입이 정해지지 않음
//필요한 저장소 만들고 만든 타입을 저장할 수 있음
//process.env.MONGOOB_URI의 url의 서버와 연결
//이때, url처럼 보이지 않음 -> 나중에 .env 파일 만들고 거기서 MONGODB_URI = "무언가"로 쓸 수 있음
//일종의 중요한 것 정의
export const connection = createConnection("mongodb+srv://user1:6r7rLjedKrUk5cYS@classcardproject.ju42zdc.mongodb.net/")

export const userSchema = new Schema<User>({
	username : {type : String, required : true},
	password : {type : String, required : true}
})

export const userModel = connection.model<User>('user', userSchema)
