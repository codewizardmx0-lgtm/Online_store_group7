// src/Components/ui/Button.jsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm",
    outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
};

const buttonSizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
};

const Button = forwardRef(
    (
        {
            className,
            variant = "primary",
            size = "md",
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-[10px] transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    buttonVariants[variant],
                    buttonSizes[size],
                    className,
                )}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
