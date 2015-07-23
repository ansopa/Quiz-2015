var path=require("path");

// Postgress DATABASE_URL=postgres://user:passwd@host:port/databse    
//DATABASE_URL=postgres://inhqtewskxaafw:8jjq6hpY5OwuRnkPkX8rBwte48@ec2-54-217-202-110.eu-west-1.compute.amazonaws.com:5432/dbo0n08f1g9hnr

//var DATABASE_URL= sqlite://:@:/   // SQLite 

var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6]||null);
var user=(url[2]||null);
var pwd=(url[3]||null);
var protocol=(url[1]||null);
var dialect=(url[1]||null);
var port=(url[5]||null);
var host=(url[4]||null);
var storage=process.env.DATABASE_STORAGE;


//Cargamos el modelo ORM

var Sequelize=require("sequelize");

//Usar BBDD SQLite3

var sequelize= new Sequelize(DB_name, user, pwd,
	{dialect:protocol,
	protocol:protocol,
	port:port,
	host:host,
	storage:storage, //solo SQLite (.env)
	omitNull:true //solo Postgres
	}
);

//Importar la definición de la tabla Quiz en quiz.js
var Quiz=sequelize.import(path.join(__dirname,"quiz"));

//Exportamos definición tabla quiz
exports.Quiz=Quiz;

//sequelize.sync() crea e inicializa la tabla preguntas en la bd
sequelize.sync().then(function(){
//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){ //la tabla se inicializa solo si está vacía
			Quiz.create({pregunta:"Capital de Italia",
						 respuesta:"Roma"
						})
	.then(function(){console.log("base de datos inicializada")});
	};
	});
	});
