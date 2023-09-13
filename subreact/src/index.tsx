import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Test from "./Test";
import App from "./App";
import Error404 from "./Error404";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="test" element={<Test />} />
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
