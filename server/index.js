const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3021
let accountList = [
  {
    agency: 0001,
    account: 123456,
    digit: 0,
    name: 'Fulano Teste',
    funds: 123.45
  },
  {
    agency: 0001,
    account: 456789,
    digit: 0,
    name: 'Cicrano Teste',
    funds: 789.45
  },
]

const findAccount = (id) => accountList.find(({ account }) => account === parseInt(id) )
const createAccount = (agency, name, funds) => {
  const digit = Math.floor(Math.random() * 10)
  let account
  let accountExists = true

  while (accountExists) {
    account = Math.floor(Math.random() * 1000)
    accountExists = accountList.some((el) => el.account === account)
  }

  return {
    agency,
    account,
    digit,
    name,
    funds: funds || 0
  }
}
 
app.use(express.json())
app.use(cors())

app.get('/accounts', (req, res) => {
  res.status(200).send(accountList)
})

app.get('/account/:account', (req, res) => {
  const account = findAccount(req.params.account)

  if (account) {
    res.status(200).send(account)
  } else {
    res.status(404).send({
      message: 'Conta não encontrada.'
    })
  }
})

app.delete('/account/:account', (req, res) => {
  const account = findAccount(req.params.account)

  if (account) {
    accountList = accountList.filter((el) => el.account !== parseInt(req.params.account))
    res.status(200).send({
      message: 'Conta deletada com sucesso.'
    })
  } else {
    res.status(404).send({
      message: 'Conta não encontrada.'
    })
  }
})

app.post('/accounts', (req, res) => {
  const { agency, name, funds } = req.body

  if (agency && name) {
    const account = createAccount(agency, name, funds)

    accountList.push(account)
    res.status(201).send({
      message: 'Conta criada com sucesso.',
      account
    })
  } else {
    const agencyMessage = agency ? '' : ' agência'
    const nameMessage = name ? '' : ' nome'
    const comma = !name && !agency ? ',' : ''

    res.status(400).send({
      message: `Os seguintes dados estão faltando:${agencyMessage}${comma}${nameMessage}`
    })
  }
})

app.put('/account/:account/transaction', (req, res) => {
  const account = findAccount(req.params.account)
  const { value } = req.body
  const validTransaction = account && account.funds + value >= 0

  if (validTransaction) {
    account.funds += value
    const message = `Valor de ${value >= 0 ? 'depósito' : 'saque'}: ${value}.`

    res.status(200).send({
      message,
      account
    })
  } if (account && !validTransaction) {
    res.status(400).send({
      message: `Limite de saque excedido, o saldo atual da conta é: R$ ${account.funds}`,
    })
  } else {
    res.status(404).send({
      message: 'Conta não encontrada.'
    })
  }
})

app.listen(
  PORT,
  () => console.log(`O aplicativo está rodando http://localhost:${PORT}`)
)
