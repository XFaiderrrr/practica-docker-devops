\# Control de visitas



Aplicación web contenerizada desarrollada con Node.js, Express y Redis como parte de una práctica integradora de DevOps.



\## Objetivo



Desarrollar una aplicación web que permita consultar una página principal, comprobar el estado del servicio e incrementar un contador de visitas almacenado en Redis.



\## Tecnologías utilizadas



\- Node.js 20

\- Express

\- Redis

\- Docker

\- Docker Compose

\- Git y GitHub

\- GitHub Actions

\- Docker Hub

\- Node.js Test Runner y Supertest



\## Funcionalidades



\- Página principal con información de la aplicación.

\- Endpoint de salud para comprobar el funcionamiento del servicio web.

\- Contador de visitas persistente mediante Redis.

\- Manejo de errores cuando Redis no está disponible.

\- Pruebas automatizadas.

\- Construcción de imagen Docker.

\- Integración continua y publicación automática de la imagen en Docker Hub.



\## Endpoints



| Método | Endpoint | Descripción |

|---|---|---|

| GET | `/` | Muestra la página principal. |

| GET | `/health` | Devuelve el estado del servicio. |

| GET | `/api/visitas` | Incrementa y devuelve el contador de visitas. |



\## Ejecutar con Docker Compose



Clona el repositorio y entra en su directorio:



```bash

git clone https://github.com/XFaiderrrr/practica-docker-devops.git

cd practica-docker-devops

```



Construye y levanta los servicios:



```bash

docker compose up -d --build

```



Consulta el estado de los contenedores:



```bash

docker compose ps

```



Abre la aplicación en el navegador:



\- Aplicación: http://localhost:3000

\- Salud del servicio: http://localhost:3000/health

\- Contador de visitas: http://localhost:3000/api/visitas



Para detener los servicios:



```bash

docker compose down

```



Los datos de Redis se almacenan en un volumen de Docker para conservar el contador al recrear el contenedor.



\## Ejecutar las pruebas



Instala las dependencias y ejecuta las pruebas:



```bash

npm ci

npm test

```



Las pruebas comprueban la página principal, el endpoint de salud, el incremento del contador y el manejo de errores de Redis.



\## Imagen publicada en Docker Hub



Imagen: `ivanlara30/control-visitas:latest`



Descargar la imagen:



```bash

docker pull ivanlara30/control-visitas:latest

```



La imagen se publica automáticamente cuando se realizan cambios en la rama `main` que superan las validaciones del flujo de GitHub Actions.



Repositorio de la imagen: https://hub.docker.com/r/ivanlara30/control-visitas



\## Integración continua



El flujo de GitHub Actions ejecuta las siguientes tareas:



1\. Descarga el código fuente.

2\. Configura Node.js.

3\. Instala las dependencias.

4\. Ejecuta las pruebas automatizadas.

5\. Construye la imagen Docker.

6\. Publica la imagen en Docker Hub cuando el evento corresponde a un `push` en `main` y las validaciones terminan correctamente.



Las credenciales de Docker Hub se administran mediante los secretos `DOCKERHUB\_USERNAME` y `DOCKERHUB\_TOKEN` configurados en GitHub.



\## Repositorio del proyecto



https://github.com/XFaiderrrr/practica-docker-devops



\## Autoría



Práctica académica de integración de Docker, GitHub Actions y Docker Hub.



