# RUNs BACKEND & FRONTEND APPLICATION
FROM node:12.3.1 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install @angular/cli && npm install && npm run build


FROM node:12.3.1 AS server-build
WORKDIR /appServer/
COPY server/package.json ./appServer
COPY server ./
COPY --from=ui-build /usr/src/app/client ./dist

# RUN Server
#     - able to listen to request from
CMD node server.js
