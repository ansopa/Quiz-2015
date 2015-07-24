var models=require("../models/models.js");

// Autoload - factoriza el código si ruta incluye :quizID
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId= ' + quizId)); }	
		}
	).catch(function(error) { next(error);});
};


// GET /quizes
exports.index = function(req, res) {
	var options = {};
   
	models.Quiz.findAll(options).then(
  	function(quizes) {
    	if (req.query.search !== undefined) {
        	console.log("Consulta: "+req.query.search);
			req.query.search = req.query.search.replace(/^| |$/g,'%');
        	models.Quiz.findAll({where: [ "pregunta like ?", req.query.search], order: [["pregunta"]]}).then(
         		function(quizes){
					console.log("longitud resultado:"+quizes.length);
                  	res.render('quizes/index.ejs', {quizes: quizes});
          		});
     	}else {
        	res.render('quizes/index.ejs', {quizes: quizes});          //order: [['name', 'DESC']]
      	}
    }
    ).catch(function(error) { next(error)});
 
};


// GET /quizes/:id
exports.show = function(req, res) {
	console.log('id de la pregunta'+req.quiz.id)
	res.render('quizes/show', { quiz: req.quiz});
};

// GET  /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
			resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};