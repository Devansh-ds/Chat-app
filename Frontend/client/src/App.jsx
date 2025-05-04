import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Status from "./components/Status/Status";
import StatusViewer from "./components/Status/StatusViewer";
import CreateGroup from "./components/Group/CreateGroup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status/:userId" element={<StatusViewer />} />
      </Routes>
    </div>
  );
}

export default App;
