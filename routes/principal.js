var express = require('express');
var router = express.Router();

// Require controller modules
var motorista_controller = require('../controllers/motoristaController');
var passageiro_controller = require('../controllers/passageiroController');
var corrida_controller = require('../controllers/corridaController');


	/// motorista ROUTES ///

	/* GET catalog home page. */
	router.get('/', motorista_controller.index);

	/* GET request for creating a motorista. NOTE This must come before routes that display motorista (uses id) */
	router.get('/motorista/create', motorista_controller.motorista_create_get);

	/* POST request for creating motorista. */
	router.post('/motorista/create', motorista_controller.motorista_create_post);

	/* GET request to delete motorista. */
	router.get('/motorista/:id/delete', motorista_controller.motorista_delete_get);

	// POST request to delete motorista
	router.post('/motorista/:id/delete', motorista_controller.motorista_delete_post);

	/* GET request to update motorista. */
	router.get('/motorista/:id/update', motorista_controller.motorista_update_get);

	// POST request to update motorista
	router.post('/motorista/:id/update', motorista_controller.motorista_update_post);

	/* GET request for one motorista. */
	router.get('/motorista/:id', motorista_controller.motorista_detail);

	/* GET request for list of all motorista items. */
	router.get('/motorista', motorista_controller.motorista_list);

	/// passageiro ROUTES ///

	/* GET request for creating passageiro. NOTE This must come before route for id (i.e. display passageiro) */
	router.get('/passageiro/create', passageiro_controller.passageiro_create_get);

	/* POST request for creating passageiro. */
	router.post('/passageiro/create', passageiro_controller.passageiro_create_post);

	/* GET request to delete passageiro. */
	router.get('/passageiro/:id/delete', passageiro_controller.passageiro_delete_get);

	// POST request to delete passageiro
	router.post('/passageiro/:id/delete', passageiro_controller.passageiro_delete_post);

	/* GET request to update passageiro. */
	router.get('/passageiro/:id/update', passageiro_controller.passageiro_update_get);

	// POST request to update passageiro
	router.post('/passageiro/:id/update', passageiro_controller.passageiro_update_post);

	/* GET request for one passageiro. */
	router.get('/passageiro/:id', passageiro_controller.passageiro_detail);

	/* GET request for list of all passageiros. */
	router.get('/passageiro', passageiro_controller.passageiro_list);

	/// corrida ROUTES ///

	/* GET request for creating a corrida. NOTE This must come before route that displays corrida (uses id) */
	router.get('/corrida/create', corrida_controller.corrida_create_get);

	/* POST request for creating corrida. */
	router.post('/corrida/create', corrida_controller.corrida_create_post);

	/* GET request to delete corrida. */
	router.get('/corrida/:id/delete', corrida_controller.corrida_delete_get);

	// POST request to delete corrida
	router.post('/corrida/:id/delete', corrida_controller.corrida_delete_post);

	/* GET request to update corrida. */
	router.get('/corrida/:id/update', corrida_controller.corrida_update_get);

	// POST request to update corrida
	router.post('/corrida/:id/update', corrida_controller.corrida_update_post);

	/* GET request for one corrida. */
	router.get('/corrida/:id', corrida_controller.corrida_detail);

	/* GET request for list of all corrida. */
	router.get('/corrida', corrida_controller.corrida_list);
	
	module.exports = router;