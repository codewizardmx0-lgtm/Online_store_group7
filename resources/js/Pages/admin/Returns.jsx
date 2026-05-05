// src/pages/admin/Returns.jsx
import { RotateCcw, Check, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import Badge from "@/Components/ui/Badge";

const STATUS_COLORS = {
    pending: "warning",
    approved: "success",
    rejected: "error",
};

export default function AdminReturns() {
    const { returns, updateReturnStatus } = useStore();
    const { addToast } = useToast();

    const handle = (id, status) => {
        updateReturnStatus(id, status);
        addToast(
            `Return ${id} ${status}.`,
            status === "approved" ? "success" : "info",
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Returns</h1>
                <p className="text-gray-500 text-sm">
                    {returns.length} return request
                    {returns.length !== 1 ? "s" : ""}
                </p>
            </div>

            {returns.length === 0 ? (
                <div className="bg-white rounded-[14px] border border-gray-200 p-12 text-center">
                    <RotateCcw className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="font-medium text-gray-900">
                        No return requests
                    </p>
                    <p className="text-sm text-gray-500">
                        Customer return requests will appear here.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Return ID
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Order
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Reason
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Date
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Status
                                </th>
                                <th className="text-right px-6 py-3 font-medium text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {returns.map((r) => (
                                <tr
                                    key={r.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-mono text-xs text-gray-700">
                                        {r.id}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-700">
                                        #{r.orderId}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 max-w-[200px] truncate">
                                        {r.reason || "—"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {r.createdAt
                                            ? new Date(
                                                  r.createdAt,
                                              ).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={
                                                STATUS_COLORS[r.status] ||
                                                "default"
                                            }
                                        >
                                            {r.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        {r.status === "pending" ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handle(r.id, "approved")
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 rounded-[6px] transition-colors"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handle(r.id, "rejected")
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 rounded-[6px] transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <span className="text-xs text-gray-400 capitalize">
                                                    {r.status}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
