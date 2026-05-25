import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Contact } from "./screens/Contact";
import { NotFound } from "./screens/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
