import { Brain } from "lucide-react"
import { Navbar } from "../../components/NavBar"
import { BookOpen } from "lucide-react"
import { Play } from "lucide-react"
import { Link } from "react-router-dom"

export const Home = () => {

    return (
        <main>
            < Navbar />

            <div className="bg-amber-50 space-y-10 text-slate-950 min-h-dvh flex flex-col items-center justify-center">
                <article className="w-full text-center space-y-5 flex flex-col items-center justify-center">
                    <h2 className="text-2xl "> Interactive Language Quiz </h2>
                    <h1 className="font-black text-5xl font-momo">British vs American <br /> English</h1>
                    <p className="text-2xl max-w-3xl font-outfit"> Test your knowledge of the fascinanting differences between British and American English. Can you tell your “trainers” from your “sneakers”?</p>
                </article>

                <div className="grid lg:grid-cols-3 space-y-5 space-x-5">
                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36 rounded-full bg-pink-300 flex items-center justify-center ">
                            <BookOpen size="70px" color="white" />
                        </figure>

                        <p className="text-center text-lg font-medium">10 Questions</p>
                    </section>

                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36 rounded-full bg-blue-400 flex items-center justify-center ">
                            <Brain size="70px" color="white" />
                        </figure>
                        <p className="text-center text-lg font-medium"  >Learn and Discover</p>
                    </section>

                    <section className="space-y-4 w-max h-max">
                        <figure className="w-36 h-36 rounded-full bg-red-400 flex items-center justify-center ">
                            <Play size="70px" color="white" />
                        </figure>
                        <p className="text-center text-lg font-medium">Instant feedback</p>
                    </section>
                </div>

                <Link to="/questions">
                    <button className="rounded-full text-neutral-50 cursor-pointer text-lg hover:brightness-110 transition-all bg-blue-700 py-4 px-10">
                        Start Quiz
                    </button>
                </Link>
            </div>
        </main>
    )
}