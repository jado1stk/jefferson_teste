	/*Modelo Passageiro*/

	var mongoose = require('mongoose');
	var uuid = require('uuid');

	var Schema = mongoose.Schema;

	var PassageiroSchema = Schema(
	  {
		_id: { 
      type: String, 
      index: { unique: true }, 
      default: uuid.v4 
			},  
		  
		pas_nome: {type: String,  max: 100},
		pas_cpf: {type: String,  max: 100},
		pas_dtnascimento: {type: Date},
		pas_sexo: {type: String, max: 100},
	  }
	);




	PassageiroSchema
	.virtual('url')
		.get(function () {
			return '/principal/passageiro/'+this._id;
	});


	module.exports = mongoose.model('passageiro', PassageiroSchema);