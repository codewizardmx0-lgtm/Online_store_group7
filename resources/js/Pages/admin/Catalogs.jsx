// src/pages/admin/Catalogs.jsx
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, BookOpen } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";

function CatalogForm({ initial = {}, onSave, onCancel }) {
    const [form, setForm] = useState({
        name: initial.name || "",
        description: initial.description || "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            return;
        }
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Catalog Name"
                placeholder="e.g. Footwear"
                value={form.name}
                onChange={(e) => {
                    setForm((p) => ({ ...p, name: e.target.value }));
                    setErrors((p) => ({ ...p, name: "" }));
                }}
                error={errors.name}
            />
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                </label>
                <textarea
                    className="w-full px-3 py-2 rounded-[10px] border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    rows={3}
                    placeholder="Short description..."
                    value={form.description}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, description: e.target.value }))
                    }
                />
            </div>
            <div className="flex gap-3 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit" size="sm" className="gap-1.5">
                    <Check className="w-4 h-4" />
                    Save
                </Button>
            </div>
        </form>
    );
}

export default function Catalogs() {
    const { catalogs, addCatalog, updateCatalog, deleteCatalog } = useStore();
    const { addToast } = useToast();
    const [showAdd, setShowAdd] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleAdd = (data) => {
        addCatalog(data);
        addToast(`Catalog "${data.name}" created.`, "success");
        setShowAdd(false);
    };

    const handleUpdate = (data) => {
        updateCatalog(editId, data);
        addToast(`Catalog updated.`, "success");
        setEditId(null);
    };

    const handleDelete = (id) => {
        const cat = catalogs.find((c) => c.id === id);
        deleteCatalog(id);
        addToast(`"${cat?.name}" deleted.`, "info");
        setDeleteId(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Catalogs
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {catalogs.length} categor
                        {catalogs.length !== 1 ? "ies" : "y"}
                    </p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => {
                        setShowAdd(true);
                        setEditId(null);
                    }}
                >
                    <Plus className="w-4 h-4" />
                    Add Catalog
                </Button>
            </div>

            {/* Add Form */}
            {showAdd && (
                <div className="bg-white rounded-[14px] border border-purple-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                        New Catalog
                    </h3>
                    <CatalogForm
                        onSave={handleAdd}
                        onCancel={() => setShowAdd(false)}
                    />
                </div>
            )}

            {/* List */}
            {catalogs.length === 0 ? (
                <div className="bg-white rounded-[14px] border border-gray-200 p-12 text-center">
                    <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="font-medium text-gray-900">No catalogs yet</p>
                    <p className="text-sm text-gray-500">
                        Add your first catalog to get started.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Name
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">
                                    Description
                                </th>
                                <th className="text-right px-6 py-3 font-medium text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {catalogs.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {editId === cat.id ? (
                                        <td colSpan={3} className="px-6 py-4">
                                            <CatalogForm
                                                initial={cat}
                                                onSave={handleUpdate}
                                                onCancel={() => setEditId(null)}
                                            />
                                        </td>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {cat.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {cat.description || "—"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditId(cat.id);
                                                            setShowAdd(false);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-[6px] transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    {deleteId === cat.id ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-red-600">
                                                                Delete?
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        cat.id,
                                                                    )
                                                                }
                                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-[6px]"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setDeleteId(
                                                                        null,
                                                                    )
                                                                }
                                                                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-[6px]"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                setDeleteId(
                                                                    cat.id,
                                                                )
                                                            }
                                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
