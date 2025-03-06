import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/index.tsx";
import VideoGame from "./pages/VideoGame.tsx"; // import VG from "./pages/VideoGame.tsx";
import "./App.css";
import "./i18n.ts"; // Importamos la configuración de i18n

function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <div>
        <button type="button" onClick={() => i18n.changeLanguage("en")}>
          {" "}
          English
        </button>
        <button type="button" onClick={() => i18n.changeLanguage("es")}>
          {" "}
          Español
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:selectedVideoGame" element={<VideoGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
