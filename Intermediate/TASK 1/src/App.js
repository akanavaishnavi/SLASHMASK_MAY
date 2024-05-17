import Login from "./components/Login";
import Register from "./components/Register";
import LinkShortener from "./components/LinkShortener";
import URLlist from "./components/URLlist";
import Navv from "./components/Navv";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./components/StateProvider";
function App() {
  const [state, dispatch] = useStateValue();
  return (
    <Router>
      <Navv />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/" element={<Register />} />

        {state.profile && (
          <>
            <Route path="/link-shortener/" element={<LinkShortener />} />
            <Route path="/url-list/" element={<URLlist />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
