import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Action from "./pages/Action";
import Creation from "./pages/Creation";

export default function App() {
    return (
        <main className="bg-black text-white scrroll-smooth">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/action" element={<Action />} />
                <Route path="/creation" element={<Creation />} />
            </Routes>
        </main>
    );
}
