const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const IncidentsOngController = require('./controllers/IncidentsOngController');
const SessionController = require('./controllers/SessionController');

/**
 * Route: Session
 */
routes.get('/sessions', SessionController.create);

/**
 * Route: Listar entidades
 */
routes.get('/ongs', OngController.index);

/**
 * Route: Cadastro da entidade
 */
routes.post('/ongs', OngController.create);

/**
 * Route: Lista os incidentes
 */
routes.get('/incidents', IncidentController.index);

/**
 * Route: Cadastro do incidente
 */
routes.post('/incidents', IncidentController.create);

/**
 * Route: Cadastro do incidente
 */
routes.delete('/incidents/:id', IncidentController.delete);

/**
 * Route: Lista todos os incidentes da Ong.
 */
routes.get('/ong', IncidentsOngController.index);

module.exports = routes;