import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { Alternative } from "../../components/Alternative"
import { useNavigate } from "react-router-dom"


export const Questions = () => {
    const token = localStorage.getItem("accessToken")
    const sessionId = localStorage.getItem("sessionId") // 🔥 ESSENCIAL

    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [submitError, setSubmitError] = useState(null)
    const navigate = useNavigate()


    // Buscar questões
    useEffect(() => {
        setIsLoading(true)

        axios.get("/questions", {
            baseURL: import.meta.env.VITE_API_URL
        })
            .then(response => {
                console.log({ questionsLoaded: response.data.length })
                setQuestions(response.data)
            })
            .catch(error => {
                console.error({ getQuestionsError: error })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const question = useMemo(
        () => questions[currentQuestion],
        [questions, currentQuestion]
    )

    const handleAnswerSelect = (index) => {
        if (showFeedback) return
        setSelectedAnswer(index)
        setSubmitError(null)
    }

    const handleSubmitAnswer = async () => {
        if (selectedAnswer === null || !question || isSubmitting) return

        const questionId = question.id
        const answer = selectedAnswer

        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const response = await axios.post("/answer", {
                sessionId,
                questionId,
                answer
            }, {
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("Resposta da API:", response.data)

            // 🔥 Correção principal: API retorna apenas `answer`
            const userAnswer = response.data.answer
            const correctAnswer = question.correctAnswer

            setIsCorrect(userAnswer === correctAnswer)
            setShowFeedback(true)

        } catch (error) {
            console.error("Erro ao enviar resposta:", error)
            setSubmitError("⚠️ Erro ao enviar a resposta. Verifique sua conexão.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowFeedback(false)
            setIsCorrect(false)
        } else {
            navigate(`/results`)

        }
    }

    const buttonText = showFeedback
        ? (currentQuestion < questions.length - 1 ? "Próxima Questão" : "Finalizar Quiz")
        : (selectedAnswer !== null ? "Enviar Resposta" : "Selecione uma opção");

    const buttonDisabled = selectedAnswer === null || isSubmitting

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-brand-gray">
                <p className="text-xl text-neutral-600">Carregando questões...</p>
            </main>
        )
    }

    if (!question) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-brand-gray">
                <p className="text-xl text-red-600">Nenhuma questão encontrada ou quiz finalizado.</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-brand-gray flex flex-col items-center justify-center py-12">
            <div className="w-full bg-neutral-50 border space-y-6 border-neutral-600 mx-auto max-w-lg shadow-md rounded-lg p-12">

                <article className="space-y-6">
                    <h2 className="text-sm text-neutral-600">
                        Questão {currentQuestion + 1} de {questions.length}
                    </h2>

                    <h1 className="text-2xl font-bold font-outfit">
                        {question.question}
                    </h1>
                </article>

                {/* Alternativas */}
                <div className="w-full flex flex-col gap-2">
                    {question.options.map((item, index) => {
                        const isSelected = selectedAnswer === index
                        const isCorrectOption = index === question.correctAnswer

                        let variant = "default"

                        if (showFeedback) {
                            if (isSelected) {
                                variant = isCorrect ? "success" : "error"
                            } else if (isCorrectOption) {
                                variant = "success"
                            }
                        } else if (isSelected) {
                            variant = "selected"
                        }

                        return (
                            <Alternative
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showFeedback || isSubmitting}
                                variant={variant}
                            >
                                {item}
                            </Alternative>
                        )
                    })}
                </div>

                <button
                    onClick={showFeedback ? handleNextQuestion : handleSubmitAnswer}
                    disabled={showFeedback ? false : buttonDisabled}
                    className={`
                        w-full mt-4 p-3 rounded-lg text-white font-bold transition-colors
                        ${showFeedback
                            ? "bg-brand-blue-light hover:bg-brand-blue"
                            : (buttonDisabled
                                ? "bg-neutral-400  cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700")}
                    `}
                >
                    {isSubmitting ? "Enviando..." : buttonText}
                </button>

                {showFeedback && (
                    <article className={`p-4 rounded-lg font-bold
                        ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    `}>
                        <p>
                            {isCorrect
                                ? question.feedbackCorrect
                                : question.feedbackIncorrect
                            }
                        </p>
                    </article>
                )}

                {submitError && (
                    <p className="text-sm text-red-500 font-medium">
                        {submitError}
                    </p>
                )}
            </div>
        </main>
    )
}