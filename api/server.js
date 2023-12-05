const app = require('./src/app');
const { logger } = require('./src/utils/logger');
const PORT = process.env.PORT;
const PROXY_PORT = process.env.PROXY_PORT;

app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT} and listening through the proxy on the port ${PROXY_PORT}`);
});
