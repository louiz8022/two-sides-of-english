import { Link } from "react-router-dom";

export const Navbar = () => {


    return (
        <header className="bg-blue-900 w-full shadow-md">


            <div className="flex items-center gap-4 order-2">


                <Link
                    to="/"
                    className="flex items-center gap-1 text-amber-50 font-semibold hover:text-brand-blue-dark">
                    Home </Link>

                <Link
                    to="/questions"
                    className="px-4 py-2 bg-brand-blue text-amber-50 rounded-full hover:bg-brand-blue-dark font-bold transition">
                    questions</Link>

                <Link
                    to="/results"
                    className="px-4 py-2 bg-brand-blue text-amber-50 rounded-full hover:bg-brand-blue-dark font-bold transition">
                    results </Link>
            </div>
        </header>
    )
}
