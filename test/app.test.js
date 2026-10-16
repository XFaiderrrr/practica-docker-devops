
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");

test("GET / muestra la página principal", async () => {
    const app = createApp({ isReady: false });

    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.match(response.text, /Control de visitas/);
});

test("GET /health devuelve el estado activo", async () => {
    const app = createApp({ isReady: false });

    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
        status: "activo"
    });
});

test("GET /api/visitas incrementa el contador", async () => {
    let contador = 0;

    const redisFalso = {
        isReady: true,
        incr: async () => {
            contador++;
            return contador;
        }
    };

    const app = createApp(redisFalso);

    const primeraVisita = await request(app).get("/api/visitas");
    const segundaVisita = await request(app).get("/api/visitas");

    assert.equal(primeraVisita.status, 200);
    assert.deepEqual(primeraVisita.body, {
        visitas: 1
    });

    assert.equal(segundaVisita.status, 200);
    assert.deepEqual(segundaVisita.body, {
        visitas: 2
    });
});

test("GET /api/visitas devuelve un error controlado si Redis no está disponible", async () => {
    const redisFalso = {
        isReady: false,
        incr: async () => 1
    };

    const app = createApp(redisFalso);

    const response = await request(app).get("/api/visitas");

    assert.equal(response.status, 503);
    assert.deepEqual(response.body, {
        error: "Redis no está disponible"
    });
});

test("GET /api/visitas controla errores al consultar Redis", async () => {
    const redisFalso = {
        isReady: true,
        incr: async () => {
            throw new Error("Fallo simulado de Redis");
        }
    };

    const app = createApp(redisFalso);

    const response = await request(app).get("/api/visitas");

    assert.equal(response.status, 503);
    assert.deepEqual(response.body, {
        error: "Redis no está disponible"
    });
});
