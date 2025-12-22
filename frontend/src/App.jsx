// src/App.jsx
import React, { Suspense, lazy } from "react";
import Loading from "./site/shared/utils/Loading.jsx";

// Lazy Imports
const SiteApp = lazy(() => import("./site/App.jsx"));
const AdminApp = lazy(() => import("./admin/App.jsx"));

export default function App() {
    const hostname = window.location.hostname;
    const searchParams = new URLSearchParams(window.location.search);

    // Mantiq: "in." subdomain yoki "?app=admin" parametri
    const isAdmin =
        hostname.startsWith("in.") || searchParams.get("app") === "admin";

    return (
        <Suspense fallback={<Loading />}>
            {isAdmin ? <AdminApp /> : <SiteApp />}
        </Suspense>
    );
}
