import { Trophy } from "lucide-react"
import { Navbar } from "../../components/NavBar"
import { Target } from "lucide-react"
import { BadgeQuestionMark } from "lucide-react"
import { RotateCcw } from "lucide-react"
import { House } from "lucide-react"

export const Results = () => {

    return (
        <main className="min-h-screen flex flex-col bg-amber-50">
            <div className="grow flex items-center justify-center p-4">
                <div className="max-w-2xl w-full ">
                    <div className="rounded-3xl bg-neutral-50 shadow-xl p-8 md:p-12 border text-center">
                        <div className="mb-6 flex justify-center">
                            <figure className="inline-flex items-center justify-center w-20 h-20 bg-blue-700 rounded-full">
                                <Trophy className="w-10 h-10 text-neutral-50" />
                            </figure>
                        </div>

<div className="mb-8">
    <h2 className="text-5xl md:text-7xl font-bold text-slate-700 mb-4"> 30%</h2>
    <p className="text-2xl md:text-3xl font-bold text-slate-600 mb-2">keep trying, you got better</p>
</div>
                       <div className=" flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400  text-slate-900 bg-green-500 text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-fuchsia-700 transition-all duration-300 ease-in-out "> 
                           <RotateCcw className="h-5 w-5" />
                           Try Again
                            </button> 
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-950 hover: bg-amber-700  text-amber-500 text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl focus:outline-amber-400 focus:ring-red-400 focus:ring-blue-900 transition-all duration-300 ease-in-out " >
                                <House className="h-5 w-5" />
                                Back To Home
                                </button>
                                </div>
                    </div>
                </div>

            </div>
        </main>
    )
}