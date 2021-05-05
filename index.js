require('dotenv/config');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const localtunnel = require('localtunnel');
const PORT = process.env.PORT || 5002;

//Middlewares
app.use(cors());
app.use(express.json());

//For the react app
if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}
/*********************************************************/
if ((process.env.NODE_ENV = 'development'))
	(async () => {
		try {
			const tunnel = await localtunnel({ port: +PORT, subdomain: 'arenahub' });

			console.log('Tunnel Url:', tunnel.url);

			tunnel.on('close', () => {
				console.log('Tunnel is closed');
			});
		} catch (e) {
			console.log(e);
		}
	})();

/*********************************************************/

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
