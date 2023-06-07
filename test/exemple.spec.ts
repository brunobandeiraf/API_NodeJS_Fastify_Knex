import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// Enunciado
// Operação
// Validação - o que eu espero - expect
    
//Executado antes de todos os testes
beforeAll(async () => {
    //Só vou começar os testes quando estiver toda carregada a aplicação
    await app.ready()
})

//Depois que todos os testes estiverem executados, vou descartar os testes
afterAll(async () => {
    await app.close()
})

test('use can create a new transaction', async () => {
    await request(app.server)
    .post('/transactions')
    .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
    })
    .expect(201)
})