import { transactionsRoutes } from './routes/transactions'
import fastify from 'fastify'
import { env } from './env'
import cookie from '@fastify/cookie'

//command + shift + P 
export const app = fastify()

app.register(cookie)
app.register(transactionsRoutes,{
    //definindo um prefixo /transactions
    prefix: 'transactions',
})