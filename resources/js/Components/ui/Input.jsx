// src/components/ui/Input.jsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(
    ({ className, type = "text", label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    ref={ref}
                    className={cn(
                        "w-full h-10 px-3 rounded-[10px] border border-gray-200 bg-white text-gray-900",
                        "placeholder:text-gray-400 text-sm",
                        "transition-all duration-200",
                        "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20",
                        "disabled:bg-gray-50 disabled:cursor-not-allowed",
                        error &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className,
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
