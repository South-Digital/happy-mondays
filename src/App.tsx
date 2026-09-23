import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import IndexPage from "./routes/IndexPage";
import ClientReviewPage from "./routes/ClientReviewPage";

import ConceptA from "./concepts/a/ConceptA";
import BaselineA from "./concepts/a/BaselineA";
import BaselineB from "./concepts/b/BaselineB";
import ConceptB from "./concepts/b/ConceptB";
import RefinedSite from "./refinement/RefinedSite";

const clientReview = import.meta.env.VITE_CLIENT_REVIEW === "true";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={clientReview ? <ClientReviewPage /> : <IndexPage />} />
          <Route path="/concept-a" element={<ConceptA />} />
          <Route path="/concept-b" element={<ConceptB />} />
          {!clientReview && (
            <>
              <Route path="/baseline/concept-a" element={<BaselineA />} />
              <Route path="/baseline/concept-b" element={<BaselineB />} />
              <Route path="/rejected/concept-a" element={<RefinedSite route="a" />} />
              <Route path="/rejected/concept-b" element={<RefinedSite route="b" />} />
            </>
          )}
          <Route path="*" element={clientReview ? <ClientReviewPage /> : <IndexPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
