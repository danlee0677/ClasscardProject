import { z } from 'zod'

export type State = {
    start : number
}

//rectangle type 검정하기 위한 것
export const userZodSchema = z.object({
    username : z.string(),
    password : z.string()
})

//rectangle type이 설정해놓은 것과 같은가?
export type User = z.infer<typeof userZodSchema>

//typescript는 export를 붙여놓은 것만 다른 곳에서 import 가능