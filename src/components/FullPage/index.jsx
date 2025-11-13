import { Link } from "react-router-dom";
import { Navbar } from "../NavBar";

export const FullPage = (children) => {


    return (
        <>
            <NavBar />
            <main className="bg-amber-50 space-y-10 text-slate-950 min-h-dvh flex flex-col items-center justify-center">
                {children}
            </main>
        </>
    )
}
