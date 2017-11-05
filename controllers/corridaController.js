/*Controller para tabela, controle e acesso a corrida*/

	var Motorista = require('../models/motorista');	
	var Passageiro = require('../models/passageiro');	
	var Corrida = require('../models/corrida');
	
	
	
	var async = require('async')

		// Lista de todos os corridas
		exports.corrida_list = function(req, res, next) {
			Corrida.find()
				.sort([['cor_nome', 'ascending']])
					.exec(function (err, list_corrida) {
						if (err) { return next(err); }
					//Successful, so render
						res.render('corrida_list', {title: 'Lista de Corridas', error:err, corrida_list: list_corrida });
		})
		};

		// Display um determinado corrida
		exports.corrida_detail = function(req, res, next) {
			async.parallel({
					corrida: function(callback) {     
						
					  Corrida.findById(req.params.id)
						.populate('cor_nome')
						.populate('cor_passageiro')
						.exec(callback);
					},
					
				  }, function(err, results) {
					if (err) { return next(err); }
				
					res.render('corrida_detail', { title: 'Title', corrida: results.corrida});
				  });
			};
			
			
		// Mostrar FORM de criar corrida em GET
		exports.corrida_create_get = function(req, res, next) {
			async.parallel({
				motoristas: function(callback) {
					Motorista.find(callback);
					},
				passageiros: function(callback) {
					Passageiro.find(callback);
					},
				}, function(err, results) {
					if (err) { return next(err); }
							res.render('corrida_form', { title: 'Nova Corrida', motoristas:results.motoristas, passageiros:results.passageiros });
				});
		};

		// Criar novo corrida em POST
		exports.corrida_create_post = function(req, res, next) {
		
			req.checkBody('cor_motorista', 'Campo Motorista invalido').notEmpty();
			req.checkBody('cor_passageiro', 'Campo Passageiro invalido').notEmpty();
			req.checkBody('cor_valor', 'Valor Invalido').notEmpty();
			
			req.sanitize('cor_valor').escape();
			req.sanitize('cor_valor').trim();
			req.sanitize('cor_motorista').escape();
			req.sanitize('cor_motorista').trim();
			req.sanitize('cor_passageiro').escape();
			req.sanitize('cor_passageiro').trim();
			
			var errors = req.validationErrors();
			
			var cor = new Corrida({
				cor_motorista: req.body.cor_motorista,
				cor_passageiro: req.body.cor_passageiro,
				cor_valor: req.body.cor_valor
				});
				
				var errors = req.validationErrors();
				if (errors) {
       
				async.parallel({
					motoristas: function(callback) {
						Motorista.find(callback);
						},
					passageiros: function(callback) {
						Passageiro.find(callback);
						},
							}, function(err, results) {
								if (err) { return next(err); }
							res.render('corrida_form', { title: 'Nova Corrida', motoristas: results.motoristas, passageiros: results.passageiros });
							});
				}else {
				
    
					cor.save(function (err) {
						if (err) { return next(err); }
						
					res.redirect(cor.url);
					})
				}
				};
		
		

		// Mostrar FORM de deletar corrida em GET
		exports.corrida_delete_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete GET');
		};

		// Controlar delete corrida em POST
		exports.corrida_delete_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete POST');
		};

		// Mostrar form de UPDATE corrida em GET
		exports.corrida_update_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update GET');
		};

		// Controlar update corrida em POST
		exports.corrida_update_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update POST');
		};