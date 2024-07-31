import Router from '@koa/router'
import {Next, ParameterizedContext} from 'koa'
import bodyParser from 'koa-bodyparser'
import {z} from 'zod'
import {userModel} from './models'
import {User, userZodSchema, State} from './types'

const router = new Router<State>()

router.get('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ username: z.string() }).safeParse(ctx.params)
    ctx.assert(paramparse.success, 400)
  
    const found = await userModel.findOne({ username: paramparse.data.username }).lean().exec()
    ctx.assert(found, 404)
  
    ctx.status = 200
    ctx.body = found
  
    await next()
})

//parse: 형식에 맞게 무언가를 변환

router.post('/user', async (ctx : ParameterizedContext<State>, next: Next) => {
    const bodyparse = userZodSchema.safeParse(ctx.request.body)
    ctx.assert(bodyparse.success, 400) //parse가 성공적인지 여부 판별

    const found = await userModel.findOne({ username: bodyparse.data.username }).lean().exec() //이름이 일치하는 것 찾기: 있으면 새롭게 만들면 안됨
    ctx.assert(found === null, 409) //일치 시 오류
  
    const model = new userModel(bodyparse.data) //객체 생성
    await model.save() // 저장
  
    ctx.status = 201
  
    await next()
})

router.delete('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ username: z.string() }).safeParse(ctx.params)
    ctx.assert(paramparse.success, 400)
    const document = await userModel.findOne({ username: paramparse.data.username }).exec()
    ctx.assert(document, 404)

    await document.deleteOne()

    ctx.status = 200 // maybe 204

    await next()
})

router.patch('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ username: z.string() }).safeParse(ctx.params) //파라미터로 수정할 것 받아옴
    ctx.assert(paramparse.success, 400)
    const bodyparse = z.object({ password : z.string() }).safeParse(ctx.request.body) //body를 불러와 수정
    ctx.assert(bodyparse.success, 400)

    const document = await userModel.findOne({ username: paramparse.data.username }).exec()
    ctx.assert(document, 404)

    await document.updateOne({
      ...paramparse.data,
      ...bodyparse.data
    })

    ctx.status = 200 // maybe 204

    await next()
})



export default router