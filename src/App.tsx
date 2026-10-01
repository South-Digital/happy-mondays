import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import IndexPage from "./routes/IndexPage";
import ClientReviewPage from "./routes/ClientReviewPage";

import ConceptA from "./concepts/a/ConceptA";

const clientReview = import.meta.env.VITE_CLIENT_REVIEW === "true";

// Keep the preferred direction eager. The alternative loads on demand;
// archived work does not enter the client-review build at all.
const ConceptB = lazy(() => import("./concepts/b/ConceptB"));
const internalPages = clientReview ? null : {
  BaselineA: lazy(() => import("./concepts/a/BaselineA")),
  BaselineB: lazy(() => import("./concepts/b/BaselineB")),
  RefinedSite: lazy(() => import("./refinement/RefinedSite")),
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Suspense fallback={<main className="grid min-h-screen place-items-center bg-[#fafaf8] text-ink" aria-busy="true"><p role="status">Loading…</p></main>}>
          <Routes>
            <Route path="/" element={clientReview ? <ClientReviewPage /> : <IndexPage />} />
            <Route path="/concept-a" element={<ConceptA />} />
            <Route path="/concept-b" element={<ConceptB />} />
            {internalPages && (
              <>
                <Route path="/baseline/concept-a" element={<internalPages.BaselineA />} />
                <Route path="/baseline/concept-b" element={<internalPages.BaselineB />} />
                <Route path="/rejected/concept-a" element={<internalPages.RefinedSite route="a" />} />
                <Route path="/rejected/concept-b" element={<internalPages.RefinedSite route="b" />} />
              </>
            )}
            <Route path="*" element={clientReview ? <ClientReviewPage /> : <IndexPage />} />
          </Routes>
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}
import { lazy, Suspense } from "react";
