import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import IndexPage from "./routes/IndexPage";
import ConceptA from "./concepts/a/ConceptA";
import BaselineA from "./concepts/a/BaselineA";
import ConceptB from "./concepts/b/ConceptB";
import RefinedSite from "./refinement/RefinedSite";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/concept-a" element={<ConceptA />} />
          <Route path="/baseline/concept-a" element={<BaselineA />} />
          <Route path="/concept-b" element={<ConceptB />} />
          <Route
            path="/rejected/concept-a"
            element={<RefinedSite route="a" />}
          />
          <Route
            path="/rejected/concept-b"
            element={<RefinedSite route="b" />}
          />
          <Route path="*" element={<IndexPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
