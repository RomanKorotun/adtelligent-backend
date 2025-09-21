FROM node:24

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . ./

RUN npx prisma generate

ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "dev"]
