import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("./Header"));
export default function Layout() {
    return (
        <div className=" flex flex-col min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
            </Suspense>
            <Outlet />
        </div>
    );
}