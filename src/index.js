const app = require('express')();

const bodyParser = require('body-parser');
const { request, response } = require('express');

app.use(bodyParser.json());

let clients = [
    {id:2,nome: 'Dionata', telefone:53984655914},
    {id:1, nome: 'Joao', telefone: 984659878},
]

//Retorna todos os clientes
app.get('/clients', (request, response) => response.json(clients))

//Buscar um unico recurso
app.get('/clients/:id', (request, response) => {
    const client = clients.filter(value => value.id == request.params.id)
    response.json(client);
})
 
//Inserir dados no servidor - BD
app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client)
    response.json(client)
})

//Atualizar nome de clientes
app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.filter(value => value.id == id);

    client[0].nome = nome;

    response.json(client);
})

//Deletar cliente
app.delete('/clients/:id', (request, response) => {
    const id = request.params.id;
    clients = clients.filter(value => value.id != id)
    response.json(clients)
})


app.listen(3000)