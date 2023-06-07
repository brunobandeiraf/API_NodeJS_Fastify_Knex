import { afterAll, beforeAll, it, describe, expect,beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

// Enunciado
// Operação
// Validação - o que eu espero - expect

describe('Transactions routes', () =>{
    //Executado antes de todos os testes
    beforeAll(async () => {
        //Só vou começar os testes quando estiver toda carregada a aplicação
        await app.ready()
    })

    //Depois que todos os testes estiverem executados, vou descartar os testes
    afterAll(async () => {
        await app.close()
    })

    //execSync permite executar comandos nodes no terminal
    //Antes de começar os testes eu apago o banco e executo tudo de novo
    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
      })

    //Deve ser possível criar uma nova transação
    it('should be able to create a new transaction', async () => {
        await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        })
        .expect(201)
    })

    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
          .post('/transactions')
          .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
          })
    
        const cookies = createTransactionResponse.get('Set-Cookie')
    
        const listTransactionsResponse = await request(app.server)
          .get('/transactions')
          .set('Cookie', cookies)
          .expect(200)
    
        //Espero que o corpo da minha lista e espero que tenha um objeto contendo
        //o título e o amount``
        expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
            title: 'New transaction',
            amount: 5000,
          }),
        ])
      })

})
