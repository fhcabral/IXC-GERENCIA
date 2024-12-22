FROM node:20 as installer

WORKDIR /api/app
COPY . .


RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /api/app
COPY --from=installer /api/app ./
CMD ["npm","run","start:build"]
