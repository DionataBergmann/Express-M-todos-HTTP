const app = require('express')();

const bodyParser = require('body-parser');
const { request, response } = require('express');

app.use(bodyParser.json());

let clients = [
    {id:2,nome: 'Dionata', telefone:53984655914},
    {id:1, nome: 'Joao', telefone: 984659878},
]

function log(request, response, next){
    const {url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`)
    return next();
}
app.use(log)

//Retorna todos os clientes
app.get('/clients', (request, response) => response.status(200).json(clients))

//Buscar um unico recurso
app.get('/clients/:id', (request, response) => {
   const {id} = request.params;
   const client = clients.find(value => value.id == id);
   if(client == undefined){
       response.status(400).send();
   }else{
       response.status(200).json(client);
   }
})
 
//Inserir dados no servidor - BD
app.post('/clients',log, (request, response) => {
    const client = request.body;
    clients.push(client)
    response.status(201).json(client)
})

//Atualizar nome de clientes
app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.find(value => value.id == id);

    if(client == undefined){
        response.status(400).send();
    }else{
        response.status(200).json(client);
    }
})

//Deletar cliente
app.delete('/clients/:id',log, (request, response) => {
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        clients.splice(index, 1);
        response.status(204).send();
    }

})


app.listen(3000)