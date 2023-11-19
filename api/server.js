const app = require('./src/app');

const PORT = process.env.PORT;
const PROXY_PORT = process.env.PROXY_PORT;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} and listening through the proxy on the port ${PROXY_PORT}`);
});
