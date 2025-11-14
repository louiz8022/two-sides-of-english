export const Alternative = ({ children, variant = "default", ...props }) => {
    const VARIANTS = {
        "default": "w-full py-6 bg-neutral-200 border border-neutral-300 cursor-pointer hover:scale-105 transition-all duration-200 font-medium text-lg",
        
        // Nova variação: Selecionado, mas feedback pendente
        "selected": "w-full py-6 bg-blue-100 border-2 border-blue-500 cursor-pointer transition-all duration-200 font-bold text-lg scale-105", 
        
        // Variações existentes para feedback (sucesso/erro)
        "success": "w-full py-6 bg-green-200 border border-green-300 cursor-pointer transition-all duration-200 font-medium text-lg",
        "error": "w-full py-6 bg-red-200 border border-red-300 cursor-pointer transition-all duration-200 font-medium text-lg", 
    }

    return (
        <button className={VARIANTS[variant]} {...props}>
            {children}
        </button>
    )
}