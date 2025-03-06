import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../types.ts";
import { useTranslation } from "react-i18next";

export default function Index() {
  const [videogames, setVideoGame] = useState<Game[]>([]);
  const { t } = useTranslation(); // hook para obtener las traducciones

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/videogames/`);
      const allVideoGames = (await response.json()) as Game[];

      const sortedGames = allVideoGames.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setVideoGame(sortedGames);
    })();
  }, []);

  return (
    <>
      <main>
        <h1>{t("title")}</h1>
        <p>{t("click_on_videogame")}</p>
        <div className="videogame-list">
          {videogames.map((videogame: Game) => {
            return (
              <Link
                to={`/${videogame.name.toLowerCase()}`}
                key={videogame.name}
                className="videogame"
              >
                {videogame.name}
              </Link>
            );
          })}
        </div>
      </main>
      <footer>
        <p>{t("footer")}</p>
      </footer>
    </>
  );
}
