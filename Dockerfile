FROM node:24

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install 

COPY . ./

RUN npx prisma generate && yarn build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bash", "-c", "npx prisma db push && yarn start"]
