import { transactionsRoutes } from './routes/transactions'
import fastify from 'fastify'
import { env } from './env'
import cookie from '@fastify/cookie'

//command + shift + P 
const app = fastify()

app.register(cookie)
app.register(transactionsRoutes,{
    //definindo um prefixo /transactions
    prefix: 'transactions',
})

app.listen({
    port: env.PORT,
}).then(() =>{
    console.log('HTTP Server Running!')
})