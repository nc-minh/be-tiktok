FROM node:16

EXPOSE 4000

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

