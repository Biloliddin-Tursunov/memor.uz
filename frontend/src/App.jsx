import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Action from "./pages/Action";
import Creation from "./pages/Creation";
import LanguageSwitch from "./components/LanguageSwitch";

export default function App() {
    return (
        <>
            <LanguageSwitch />
            <main
                style={{
                    background:
                        "linear-gradient(164deg, rgba(107, 107, 107, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), #000",
                    minHeight: "100vh",
                    width: "100%",
                }}
                className="bg-black  text-white scrroll-smooth">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/action" element={<Action />} />
                    <Route path="/creation" element={<Creation />} />
                </Routes>
            </main>
        </>
    );
}
