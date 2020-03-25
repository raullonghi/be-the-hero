const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Rotas / Recursos
 */


/**
 * Métodos HTTP
 * 
 * GET
 * POST
 * PUT
 * DELETE
 */


/**
 * Tipos de parâmetros:
 * 
 * Query Params: parâmetros nomeados enviados na rota, após do ?
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição
 */

 

/**
 * query
 
app.post('/users',(request, response) => {
    const params = request.query;
    console.log(params);
    return response.json({
        evento : "OmniStack 11.0",
        aluno : "Raul Longhi"
    })
});


 */

app.listen(3333);
