import './styles/index.css';
import { createRoot } from "react-dom/client";
import { SpaceBackground } from "./components/common/SpaceBackground";
import App from "./App";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(
	<>
		<SpaceBackground />
		<App />
	</>
);