import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import data from "./api/data.json" with { type: "json" }; //import data from "./api/data_2.json" with { type: "json" };

export const app = new Application();
const router = new Router();

router.get("/api/videogames", (context) => { //"/api/videogames"
  context.response.body = data;
});

router.get("/api/videogames/:videogame", (context) => { //"/api/videogames/:videogame"
  if (!context?.params?.videogame) { // .videogame
    context.response.body = "No videogame name provided.";
  }

  const videogame = data.find((item) =>
    item.name.toLowerCase() === context.params.videogame.toLowerCase()
  );

  context.response.body = videogame ?? "No videogame found.";
});


app.use(router.routes());
app.use(
  routeStaticFilesFrom([
    `${Deno.cwd()}/client/dist`,
    `${Deno.cwd()}/client/public`,
  ])
);

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
