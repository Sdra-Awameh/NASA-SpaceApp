import './styles/index.css';
import { createRoot } from "react-dom/client";
import { SpaceBackground } from "./components/common/SpaceBackground";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<>
		<SpaceBackground />
		<App />
	</>
);