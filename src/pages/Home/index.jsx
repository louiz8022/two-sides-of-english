import { Brain } from "lucide-react"
import { Navbar } from "../../components/NavBar"
import { BookOpen } from "lucide-react"
import { Play } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const Home = () => {
    const navigate = useNavigate()

    const handleStart = async () => {
        try {
            const response = await axios.post("/auth/session", {}, {
                baseURL: import.meta.env.VITE_API_URL
            })

            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("sessionId", response.data.sessionId)

            navigate("/questions")
        } catch (error) {
            console.error({ handleStartError: error })
        }
    }

    return (
        <main>
            <div className="bg-brand-gray space-y-10 text-slate-950 min-h-dvh flex flex-col items-center justify-center">
                <picture>
                    <img src="./logo.png" alt="two-side-of-english" className="w-36 h-56w-56 h-56  flex items-center justify-center " />
                </picture>
                <article className="w-full text-center space-y-5 flex flex-col items-center justify-center">
                    <h2 className="text-2xl "> Interactive Language Quiz </h2>
                    <h1 className="font-black text-5xl font-momo">British vs American <br /> English</h1>
                    <p className="text-2xl max-w-3xl font-outfit"> Test your knowledge of the fascinanting differences between British and American English. Can you tell your “trainers” from your “sneakers”?</p>
                </article>

                <div className="grid lg:grid-cols-3 space-y-5 space-x-5">
                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36 rounded-full bg-brand-red flex items-center justify-center ">
                            <BookOpen size="70px" color="white" />
                        </figure>

                        <p className="text-center text-lg font-medium">30 Questions</p>
                    </section>

                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36 rounded-full bg-brand-blue-light flex items-center justify-center ">
                            <Brain size="70px" color="white" />
                        </figure>
                        <p className="text-center text-lg font-medium"  >Learn and Discover</p>
                    </section>

                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36w-36 h-36 rounded-full bg-brand-gray-dark flex items-center justify-center ">
                            <Play size="70px" color="white" />
                        </figure>
                        <p className="text-center text-lg font-medium">Instant feedback</p>
                    </section>
                </div>

                <button onClick={() => handleStart()} className="rounded-full text-neutral-50 font-semibold cursor-pointer text-lg hover:brightness-110 transition-all bg-brand-blue-dark-two py-4 px-16 mx-auto">
                    Start Quiz
                </button>
            </div>
        </main>
    )
}