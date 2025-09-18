import Fastify from "fastify";

const app = Fastify();

app.listen({ port: 3000 }, (error, adress) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log(`Server running at ${adress}`);
});
