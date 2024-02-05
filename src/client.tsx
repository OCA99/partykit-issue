import "./styles.css";
import { createRoot } from "react-dom/client";
import TextEditor from "./client/components/TextEditor";

function App() {
  return <TextEditor />;
}

createRoot(document.getElementById("app")!).render(<App />);
