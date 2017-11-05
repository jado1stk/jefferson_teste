	/*Modelo Motorista*/

	var mongoose = require('mongoose');
	var uuid = require('uuid')

	var Schema = mongoose.Schema;

	var MotoristaSchema = Schema(
	  {
		_id: { 
      type: String, 
      index: { unique: true }, 
      default: uuid.v4 
			},   
		  
		mot_nome: {type: String, required: true, max: 100},
		mot_cpf: {type: String, required: true, max: 100},
		mot_dtnascimento: {type: Date, required: true},
		mot_carro: {type: String, required: true, max: 100},
		mot_status: {type: Boolean},
		mot_sexo: {type: String, required: true, max: 100},
	  }
	);




	MotoristaSchema
	.virtual('url')
		.get(function () {
			return '/principal/motorista/'+this._id;
	});


	module.exports = mongoose.model('Motorista', MotoristaSchema);