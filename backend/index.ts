import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from "koa-bodyparser"
import commandLineLogger from 'koa-logger'

import router from "./routes"

const app = new Koa();
const PORT = 3001;

app.use(cors());
//{credentials:true}
//request를 모두 commandline에 보여주는 것
app.use(commandLineLogger());
//request가 다 하나의 string으로 들어오는데, 이를 object로 나눠주는 것
app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

// app.use(async (ctx, next) => {
//     ctx.body = 'hello world';
// });

//전체 앱에 middleware로 연결
app.use(router.middleware())

app.on('error', e => console.error('Error', e))
//포트 3001을 맏음
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));