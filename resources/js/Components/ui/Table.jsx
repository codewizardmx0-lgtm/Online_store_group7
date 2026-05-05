// src/components/ui/Table.jsx
import { cn } from "@/lib/utils";

export function Table({ className, children }) {
    return (
        <div className="w-full overflow-auto">
            <table className={cn("w-full caption-bottom text-sm", className)}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ className, children }) {
    return (
        <thead className={cn("border-b border-gray-200", className)}>
            {children}
        </thead>
    );
}

export function TableBody({ className, children }) {
    return (
        <tbody className={cn("[&_tr:last-child]:border-0", className)}>
            {children}
        </tbody>
    );
}

export function TableRow({ className, children }) {
    return (
        <tr
            className={cn(
                "border-b border-gray-100 transition-colors",
                "hover:bg-gray-50/50",
                className,
            )}
        >
            {children}
        </tr>
    );
}

export function TableHead({ className, children }) {
    return (
        <th
            className={cn(
                "h-12 px-4 text-left align-middle font-medium text-gray-500",
                "first:pl-6 last:pr-6",
                className,
            )}
        >
            {children}
        </th>
    );
}

export function TableCell({ className, children }) {
    return (
        <td
            className={cn(
                "p-4 align-middle text-gray-900",
                "first:pl-6 last:pr-6",
                className,
            )}
        >
            {children}
        </td>
    );
}
