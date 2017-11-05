/*Controller para tabela, controle e acesso a Motoristas*/

	var Motorista = require('../models/motorista');	
	var Passageiro = require('../models/passageiro');	
	var Corrida = require('../models/corrida');
	
	var async = require('async')
	
		exports.index = function(req, res) {
			async.parallel(
			{
				motorista_count: function(callback){
					Motorista.count(callback);
				},
				passageiro_count: function(callback){
					Passageiro.count(callback);
				},
				corrida_count: function(callback){
					Corrida.count(callback);
				}
			}, function(err, results){
				res.render('index', { title: 'Home', error: err, data: results});
			});
		};
		
		// Lista de todos os motoristas
		exports.motorista_list = function(req, res, next) {
			Motorista.find()
				.sort([['mot_nome', 'ascending']])
					.exec(function (err, list_motorista) {
						if (err) { return next(err); }
					//Successful, so render
						res.render('motorista_list', { title: 'Lista Motoristas', motorista_list: list_motorista });
    });
		};

		// Display um determinado motorista
		exports.motorista_detail = function(req, res, next) {
			async.parallel({
				motorista: function(callback) {     
        			Motorista.findById(req.params.id)
						.exec(callback);
						},
				  }, function(err, results) {
				if (err) { return next(err); }
				//Successful, so render
				res.render('motorista_detail', { title: 'Title', motorista: results.motorista});
			  });
			};		

		// Mostrar FORM de criar Motorista em GET
		exports.motorista_create_get = function(req, res, next) {
			res.render('motorista_form', { title: 'Registrar Motorista' });
		};

		// Criar novo motorista em POST
		exports.motorista_create_post = function(req, res, next) {
			
			
			req.checkBody('mot_nome', 'Campo Nome Invalido').notEmpty();
			req.checkBody('mot_cpf', 'Campo CPF invalido').notEmpty();
			req.checkBody('mot_dtnascimento', 'Data Invalida').notEmpty();
			req.checkBody('mot_sexo', 'Camp Sexo Invalido').notEmpty();
			req.checkBody('mot_carro', 'Campo carro invalido').notEmpty();
			
			req.sanitize('mot_nome').escape();
			req.sanitize('mot_nome').trim();
			req.sanitize('mot_cpf').escape();
			req.sanitize('mot_cpf').trim();
			req.sanitize('mot_dtnascimento').toDate();
			req.sanitize('mot_sexo').escape();
			req.sanitize('mot_sexo').trim();
			req.sanitize('mot_carro').escape();
			req.sanitize('mot_carro').trim();
			
			var errors = req.validationErrors();
			
			var mot = new Motorista({
				mot_nome: req.body.mot_nome,
				mot_cpf: req.body.mot_cpf,
				mot_dtnascimento: req.body.mot_dtnascimento,
				mot_sexo: req.body.mot_sexo,
				mot_carro: req.body.mot_carro,
				mot_status: req.body.mot_status
			});
			
			if (errors) {
			//If there are errors render the form again, passing the previously entered values and errors
				res.render('motorista_form', { title: 'Registrar Motorista', Motorista: Motorista, errors: errors});
				return;
					} 
					else {
						// Data from form is valid.
        //Check if Passageiro with same name already exists
        Motorista.findOne({ 'mot_nome': req.body.mot_nome })
            .exec( function(err, found_motorista) {
                 console.log('found_motorista: ' + found_motorista);
                 if (err) { return next(err); }
                 
                 if (found_motorista) { 
                     //Passageiro exists, redirect to its detail page
                     res.redirect(found_motorista.url);
                 }
                 else {
                     
                     mot.save(function (err) {
                       if (err) { return next(err); }
                       //Passageiro saved. Redirect to passageiro detail page
                       res.redirect(mot.url);
                     });
                     
                 }
                 
             });
			}
		};
		
		

		// Mostrar FORM de deletar motorista em GET
		exports.motorista_delete_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete GET');
		};

		// Controlar delete Motorista em POST
		exports.motorista_delete_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete POST');
		};

		// Mostrar form de UPDATE Motorista em GET
		exports.motorista_update_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update GET');
		};

		// Controlar update Motorista em POST
		exports.motorista_update_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update POST');
		};