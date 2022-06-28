const express = require('express')

const server = express()

const port = process.env.PORT || 3000

server.use(express.json())

const users = ['Tipscode', 'Dukeza', 'Tux']

server.get('/users', (req, res) =>{
    res.json(users)
    res.send("aplicação rodando"+ users)
})

server.get('/users/:index', (req, res) =>{
    const { index } = req.params

    res.json(users[index])
    res.send("aplicação rodando"+ users[index])
})

server.post('/users', (req, res) => {
    const { name } = req.body

    users.push(name)

    res.json(users)
    res.send("aplicação rodando"+ users)
})

server.put('/users/:index', (req, res) => {
    const { index } = req.params
    const { name } = req.body

    users[index] = name

    res.json(users)
    res.send("aplicação rodando"+ users)
})

server.delete('/users/:index', (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    res.json(users)
    res.send("aplicação rodando"+ users)
})


server.listen(port, () => {
    console.info("aplicação rodando")
})