import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { Alternative } from "../../components/Alternative" 

export const Questions = () => {
    const token = localStorage.getItem("accessToken")
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    // Estado para desabilitar o botão de enviar enquanto a requisição está em andamento
    const [isSubmitting, setIsSubmitting] = useState(false)

    // --- Hooks de Dados ---

    useEffect(() => {
        // Ajuste a URL se 'questions' não for o endpoint correto
        axios.get("/questions", {
            baseURL: import.meta.env.VITE_API_URL
        }).then(response => {
            console.log("Perguntas carregadas:", response.data)
            setQuestions(response.data)
        }).catch(error => {
            console.error({ getQuestionsError: error })
        })
    }, [])

    const question = useMemo(() => questions[currentQuestion], [questions, currentQuestion])

    // --- Funções de Lógica ---

    const handleAnswerSelect = (index) => {
        // Permite a seleção apenas se o feedback ainda não foi mostrado
        if (showFeedback) return

        setSelectedAnswer(index)
    }

    const handleSubmitAnswer = async () => {
        if (selectedAnswer === null || !question || isSubmitting) return

        const questionId = question.id // Supondo que a questão tem um 'id'
        const answer = selectedAnswer // Envia o índice da opção selecionada

        setIsSubmitting(true)

        try {
            // 1. Enviar resposta para a API
            const response = await axios.post("/answer", {
                questionId,
                answer
            }, {
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("Resposta da API:", response.data)

            // 2. Processar feedback da API
            // Supondo que a API retorna um campo 'isCorrect' ou similar
            const correct = response.data.isCorrect

            setIsCorrect(correct)
            setShowFeedback(true)

        } catch (error) {
            console.error("Erro ao enviar resposta:", error)
            // Lidar com o erro (ex: mostrar uma mensagem)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNextQuestion = () => {
        // Verifica se há mais perguntas
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null) // Limpa a seleção
            setShowFeedback(false) // Desliga o feedback
            setIsCorrect(false)
        } else {
            alert("Quiz concluído!") // Ou navegue para a tela de resultados
        }
    }


    // Texto do botão dinâmico
    const buttonText = showFeedback
        ? (currentQuestion < questions.length - 1 ? "Próxima Questão" : "Finalizar")
        : (selectedAnswer !== null ? "Enviar Resposta" : "Selecione uma opção");

    // Lógica para desabilitar o botão principal
    const buttonDisabled = selectedAnswer === null || isSubmitting;


    return (
        <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center py-12">
            <div className="w-full bg-neutral-50 border space-y-6 border-neutral-600 mx-auto max-w-lg shadow-md rounded-lg p-12">

                <article className="space-y-6">
                    <h2 className="text-sm text-neutral-600">Questão {currentQuestion + 1} de {questions.length} </h2>
                    <h1 className="text-2xl font-bold font-outfit">{question?.question}</h1>
                </article>

                {/* --- Alternativas --- */}
                <div className="w-full flex flex-col gap-2">
                    {question?.options.map((item, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectOption = index === question.correctAnswer; // Índice da resposta correta na questão

                        let variant = 'default';

                        if (showFeedback) {
                            // Lógica PÓS-FEEDBACK
                            if (isSelected) {
                                // A alternativa selecionada usa o status retornado pela API (isCorrect)
                                variant = isCorrect ? 'success' : 'error';
                            } else if (isCorrectOption) {
                                // Se o feedback está ativo E a alternativa NÃO foi a selecionada, mas é a correta, 
                                // ela deve ser destacada como 'success'.
                                variant = 'success';
                            }
                        } else if (isSelected) {
                            // Lógica PRÉ-FEEDBACK: Apenas selecionado, feedback pendente
                            variant = 'selected';
                        }

                        return (
                            <Alternative
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                // Desabilita o clique se houver feedback OU se o envio estiver em curso
                                disabled={showFeedback || isSubmitting}
                                variant={variant}
                            >
                                {item}
                            </Alternative>
                        );
                    })}
                </div>

                {/* --- Botão de Ação --- */}
                <button
                    onClick={showFeedback ? handleNextQuestion : handleSubmitAnswer}
                    disabled={showFeedback ? false : buttonDisabled}
                    className={`
                        w-full mt-4 p-3 rounded-lg text-white font-bold transition-colors
                        ${showFeedback
                            ? "bg-blue-600 hover:bg-blue-700" // Cor para 'Próxima Questão'
                            : (buttonDisabled
                                ? "bg-neutral-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700")
                        }
                    `}
                >
                    {isSubmitting ? "Enviando..." : buttonText}
                </button>

                {/* --- Feedback Visual --- */}
                {showFeedback && (
                    <article className={`p-4 rounded-lg font-bold ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <p>{isCorrect ? "✅ Resposta correta! Parabéns." : "❌ Resposta incorreta. Tente novamente."}</p>
                    </article>
                )}
            </div>
        </main>
    )
}