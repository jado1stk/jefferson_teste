	/*Modelo Corrida*/

	var mongoose = require('mongoose');
	var uuid = require('uuid');

	var Schema = mongoose.Schema;

	var CorridaSchema = Schema(
	  {
		  
		  _id: { 
				type: String, 
				index: { unique: true }, 
				default: uuid.v4 
			},  
			
		cor_motorista: {type: Schema.ObjectId, ref: 'mot_nome', required: true, max: 100},
		cor_passageiro: {type: Schema.ObjectId, ref: 'pas_nome', required: true, max: 100},
		cor_valor: {type: String, required: true},
	  }
	);




	CorridaSchema
	.virtual('url')
		.get(function () {
			return '/principal/corrida/'+this._id;
	});


	module.exports = mongoose.model('corrida', CorridaSchema);