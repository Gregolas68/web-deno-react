import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Game } from "../types.ts"; // import { Game } from "../types.ts";

export default function VideoGame() {
  const { selectedVideoGame } = useParams();
  const { t } = useTranslation();
  const [videogame, setGame] = useState<Game>({ name: "", description: "" });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/videogames/${selectedVideoGame}`);
      const game = (await resp.json()) as Game;
      setGame(game);
    })();
  }, [selectedVideoGame]);

  return (
    <div>
      <br />
      <Link to="/">🠠 {t("back")}</Link>
      <h1>{videogame.name}</h1>
      <img
        src={`/images/${videogame.name.toLowerCase()}.jpg`}
        alt={videogame.name}
        width="300"
      />
      <p>
        {t(`videogames.${videogame.name}.description`, {
          defaultValue: videogame.description,
        })}
      </p>
    </div>
  );
}
