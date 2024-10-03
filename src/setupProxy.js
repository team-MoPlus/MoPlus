const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");

const app = express();

app.use(
	"/",
	createProxyMiddleware({
		target: "https://moplus.vercel.app",
		changeOrigin: true,
		secure: false,
	})
);

app.listen(3001, () => {
	console.log("Proxy server running on http://localhost:3001");
});
