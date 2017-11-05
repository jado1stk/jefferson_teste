/*Controller para tabela, controle e acesso a Passageiro*/
var async = require('async');


	var Passageiro = require('../models/passageiro');	

		// Lista de todos os passageiros
		exports.passageiro_list = function(req, res, next) {
			Passageiro.find()
				.sort([['pas_nome', 'ascending']])
					.exec(function (err, list_passageiro) {
						if (err) { return next(err); }
					//Successful, so render
						res.render('passageiro_list', { title: 'Lista Passageiros', passageiro_list: list_passageiro });
    });
		};

		// Display um determinado passageiro
		exports.passageiro_detail = function(req, res, next) {
			async.parallel({
				passageiro: function(callback) {     
        			Passageiro.findById(req.params.id)
						.exec(callback);
						},
				  }, function(err, results) {
				if (err) { return next(err); }
				//Successful, so render
				res.render('passageiro_detail', { title: 'Title', passageiro: results.passageiro});
			  });
			};		

		// Mostrar FORM de criar passageiro em GET
		exports.passageiro_create_get = function(req, res, next) {
			res.render('passageiro_form', { title: 'Registrar Passageiro' });
		};

		// Criar novo passageiro em POST
		exports.passageiro_create_post = function(req, res, next) {
			
			req.checkBody('pas_nome', 'Campo Nome Invalido').notEmpty();
			req.checkBody('pas_cpf', 'Campo CPF invalido').notEmpty();
			req.checkBody('pas_dtnascimento', 'Data Invalida').notEmpty();
			req.checkBody('pas_sexo', 'Camp Sexo Invalido').notEmpty();
			
			req.sanitize('pas_nome').escape();
			req.sanitize('pas_nome').trim();
			req.sanitize('pas_cpf').escape();
			req.sanitize('pas_cpf').trim();
			req.sanitize('pas_dtnascimento').toDate();
			req.sanitize('pas_sexo').escape();
			req.sanitize('pas_sexo').trim();
			
			var errors = req.validationErrors();
			
			var pas = new Passageiro({
				pas_nome: req.body.pas_nome,
				pas_cpf: req.body.pas_cpf,
				pas_dtnascimento: req.body.pas_dtnascimento,
				pas_sexo: req.body.pas_sexo
			});
			
			if (errors) {
			//If there are errors render the form again, passing the previously entered values and errors
				res.render('passageiro_form', { title: 'Registrar Passageiro', passageiro: passageiro, errors: errors});
				return;
					} 
					else {
        // Data from form is valid.
        //Check if Passageiro with same name already exists
        Passageiro.findOne({ 'pas_nome': req.body.pas_nome })
            .exec( function(err, found_passageiro) {
                 console.log('found_passageiro: ' + found_passageiro);
                 if (err) { return next(err); }
                 
                 if (found_passageiro) { 
                     //Passageiro exists, redirect to its detail page
                     res.redirect(found_passageiro.url);
                 }
                 else {
                     
                     pas.save(function (err) {
                       if (err) { return next(err); }
                       //Passageiro saved. Redirect to passageiro detail page
                       res.redirect(pas.url);
                     });
                     
                 }
                 
             });
			}

		};

		// Mostrar FORM de deletar passageiro em GET
		exports.passageiro_delete_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete GET');
		};

		// Controlar delete passageiro em POST
		exports.passageiro_delete_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author delete POST');
		};

		// Mostrar form de UPDATE passageiro em GET
		exports.passageiro_update_get = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update GET');
		};

		// Controlar update passageiro em POST
		exports.passageiro_update_post = function(req, res) {
			res.send('NOT IMPLEMENTED: Author update POST');
		};