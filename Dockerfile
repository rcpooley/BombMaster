FROM node:16.13.0 AS build-backend
COPY Backend/package.json /bomb/backend/
COPY Backend/package-lock.json /bomb/backend/
WORKDIR /bomb/backend
RUN npm i
COPY Backend/config.json /bomb/backend/
COPY Backend/server.js /bomb/backend/

FROM node:16.13.0 AS build-frontend
COPY package.json /bomb/frontend/
COPY package-lock.json /bomb/frontend/
WORKDIR /bomb/frontend
RUN npm i
COPY src /bomb/frontend/src
COPY postcss.config.js /bomb/frontend/
RUN npm run build

FROM node:16.13.0
COPY --from=build-frontend /bomb/frontend/dist /bomb/dist
COPY --from=build-backend /bomb/backend /bomb/backend
WORKDIR /bomb/backend
CMD ["node", "server.js"]