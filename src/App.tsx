import Button from "./components/button";
import { ToggleTheme } from "./components/toggleTheme";

export default function App() {
  return (
    <div>
      <Button label={"Clique aqui"} />
      Teste: Tailwind está funcionando! 💙
      <ToggleTheme />
    </div>
  );
}
