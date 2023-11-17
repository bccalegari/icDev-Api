require('dotenv').config();

const db = require('./models');

const express = require('express');

const app = express();
app.use(express.json());

const test = async () => {
	try {
		await db.sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

test();


//db.permission.create({'name': 'all'});

//db.role.create({'name': 'root'});

//db.rolePermissions.create({'idRole': 1, 'idPermission': 1});

/*
db.user.create({'name': 'bruno', 'lastName': 'calegari', 'cpf': '11111111111', 'street': 'rua arutana', 
	'streetNumber': 6, 'district': 'pq dom pedro ii', 'birthDate': '2000-10-29', 'phone': '19995109554',
	'email': 'brunocostacallegari@gmail.com', 'idCity': 1, 'createdBy': 1, 'idCompany': 1}, {
	'user': 1
});
*/

/*
db.user.findByPk(6).then((user) => user.update({'name': 'change'}, {
	'user': 1}));
*/

/*
db.user.findByPk(6).then((user) => user.destroy({
	'user': 1
}));
*/

/*
const teste = async () => {
	const model = await db.rolePermissions.findOne({where: {idRole: 1, idPermission: 1}, include: [db.role, db.permission]});
	console.log(model);
};

teste();
*/
//db.apiKey.create({'key': 'dsasdsasdsasdsws'});

//db.company.findById();

//db.company.create({'name': 'dsadsadadsa', 'idApiKey': 1});

module.exports = app;
