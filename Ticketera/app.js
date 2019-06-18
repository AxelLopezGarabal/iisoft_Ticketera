const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ticketRoutes = require('./api/routes/ticket');
const employeeRoutes = require('./api/routes/employee');
const enterpriseRoutes = require('./api/routes/enterprise');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/ticket', ticketRoutes);
app.use('/employee', employeeRoutes);
app.use('/enterprise', enterpriseRoutes);


app.use((req, res, next)=>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	})
});

module.exports = app;