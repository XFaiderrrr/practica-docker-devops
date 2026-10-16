
const express = require("express");
const { createClient } = require("redis");

function createApp(redisClient) {
    const app = express();

    app.get("/", (req, res) => {
        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Control de visitas</title>
            </head>
            <body>
                <h1>Control de visitas</h1>
                <p>Aplicación web con Node.js, Express y Redis.</p>
                <p>Consulta <a href="/health">/health</a> para comprobar el estado.</p>
                <p>Visita <a href="/api/visitas">/api/visitas</a> para incrementar el contador.</p>
            </body>
            </html>
        `);
    });

    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "activo"
        });
    });

    app.get("/api/visitas", async (req, res) => {
        try {
            if (!redisClient || !redisClient.isReady) {
                return res.status(503).json({
                    error: "Redis no está disponible"
                });
            }

            const visitas = await redisClient.incr("visitas");

            return res.status(200).json({
                visitas
            });
        } catch (error) {
            console.error("Error al consultar Redis:", error.message);

            return res.status(503).json({
                error: "Redis no está disponible"
            });
        }
    });

    return app;
}

module.exports = { createApp };

if (require.main === module) {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    const port = Number(process.env.PORT) || 3000;

    const redisClient = createClient({
        url: redisUrl
    });

    redisClient.on("error", (error) => {
        console.error("Error de Redis:", error.message);
    });

    redisClient.connect().catch((error) => {
        console.error("No se pudo conectar a Redis:", error.message);
    });

    const app = createApp(redisClient);

    app.listen(port, "0.0.0.0", () => {
        console.log(`Control de visitas ejecutándose en el puerto ${port}`);
    });
}
