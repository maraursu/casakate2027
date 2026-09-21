import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { SiteGate } from "./components/SiteGate";
import { Agenda } from "./pages/Agenda";
import { Costs } from "./pages/Costs";
import { Girls } from "./pages/Girls";
import { Home } from "./pages/Home";
import { Logistics } from "./pages/Logistics";
import { Planning } from "./pages/Planning";

export default function App() {
  return (
    <SiteGate>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/travel" element={<Logistics />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/girls" element={<Girls />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </SiteGate>
  );
}
