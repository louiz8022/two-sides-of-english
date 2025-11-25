import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trophy, RotateCcw, House } from "lucide-react";
import axios from "axios";

export const Results = () => {
    const token = localStorage.getItem("accessToken")

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadResults() {
            try {
                const response = await axios.get("/results", {
                    baseURL: import.meta.env.VITE_API_URL,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setResults(response.data);
            } catch (error) {
                console.error("Erro ao carregar resultados:", error);
            } finally {
                setLoading(false);
            }
        }

        loadResults();
    }, [token]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-amber-50">
                <p className="text-xl text-neutral-600">Carregando resultados...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-amber-50">
            <div className="grow flex items-center justify-center p-4">
                <div className="max-w-2xl w-full">
                    <div className="rounded-3xl bg-neutral-50 shadow-xl p-8 md:p-12 border text-center">

                        <div className="mb-6 flex justify-center">
                            <figure className="inline-flex items-center justify-center w-20 h-20 bg-blue-700 rounded-full">
                                <Trophy className="w-10 h-10 text-neutral-50" />
                            </figure>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-5xl md:text-7xl font-bold text-slate-700 mb-4">
                                {results.percentage}%
                            </h2>

                            <p className="text-2xl md:text-3xl font-bold text-slate-600 mb-2">
                                {results.percentage < 50
                                    ? "Keep trying, you got better"
                                    : results.percentage < 80
                                        ? "Great job! You're improving!"
                                        : "Excellent! You're a master!"}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/questions")}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-slate-900 text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                            >
                                <RotateCcw className="h-5 w-5" />
                                Try Again
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-950 text-amber-500 text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                            >
                                <House className="h-5 w-5" />
                                Back To Home
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};
