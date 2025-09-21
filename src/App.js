import logo from "./logo.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import TeamSelection from "./component/TeamSelection";
import { Theme } from "@radix-ui/themes";

function App() {
  console.log("run");

  return (
    <Theme>
      <TeamSelection />
    </Theme>
  );
}

export default App;
