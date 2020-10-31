const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionsRouter = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({
	path: './config/config.env',
});

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello backend');
});

app.use('/api/transactions', transactionsRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

app.listen(PORT, () => {
	console.log(`App running at http://localhost:${PORT}`);
});
