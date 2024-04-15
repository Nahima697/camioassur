FROM node:18-alpine

WORKDIR /c/camioassur/front-end

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
