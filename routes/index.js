var express = require('express');
var router = express.Router();

var quizController =require("../controllers/quiz_controller");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// --> Instalamos un MiddleWare al enrutador
+/* GET author page. */
router.get("/author", function(req, res) {
  res.render("author", { 
						curso: "Desarrollo de servicios en la nube con HTML5, JavaScript y NodeJS",
						nombre: "Angel Sobrino",  
						profesion:"Docente programación",
						profesor:"Juan Quemada",
						foto:"./images/photo.jpg",
						titulofoto:"Angel Sobrino"
						});
});
router.get('/quizes', 					   quizController.index);
router.get('/quizes/:quizId(\\d+)', 	   quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
module.exports = router;
