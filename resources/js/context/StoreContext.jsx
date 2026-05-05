// src/context/StoreContext.jsx
// Central store for products, catalogs, orders, and returns — all backed by localStorage.
// This is the single source of truth that replaces mockData.js for live data.
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import {
    products as SEED_PRODUCTS,
    categories as SEED_CATS,
} from "@/lib/mockData";

const StoreContext = createContext();

// ─── localStorage helpers ────────────────────────────────────────────────────
function load(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Seed catalogs from categories if none exist yet
function initCatalogs() {
    const stored = load("catalogs", null);
    if (stored) return stored;
    const seeded = SEED_CATS.map((c, i) => ({
        id: c.id,
        name: c.name,
        description: `${c.name} products`,
        image: c.image, // ← أضف هذا
    }));
    save("catalogs", seeded);
    return seeded;
}

// Seed products from mockData if none exist yet
function initProducts() {
    const stored = load("products", null);
    if (stored) return stored;
    save("products", SEED_PRODUCTS);
    return SEED_PRODUCTS;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function StoreProvider({ children }) {
    const [catalogs, setCatalogs] = useState(() => initCatalogs());
    const [products, setProducts] = useState(() => initProducts());
    const [orders, setOrders] = useState(() => load("orders", []));
    const [returns, setReturns] = useState(() => load("returns", []));

    // Persist on every change
    useEffect(() => {
        save("catalogs", catalogs);
    }, [catalogs]);
    useEffect(() => {
        save("products", products);
    }, [products]);
    useEffect(() => {
        save("orders", orders);
    }, [orders]);
    useEffect(() => {
        save("returns", returns);
    }, [returns]);

    // ── CATALOG CRUD ────────────────────────────────────────────────────────
    const addCatalog = useCallback((data) => {
        const next = { id: Date.now(), ...data };
        setCatalogs((prev) => [...prev, next]);
        return next;
    }, []);

    const updateCatalog = useCallback((id, data) => {
        setCatalogs((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...data } : c)),
        );
    }, []);

    const deleteCatalog = useCallback((id) => {
        setCatalogs((prev) => prev.filter((c) => c.id !== id));
    }, []);

    // ── PRODUCT CRUD ────────────────────────────────────────────────────────
    const addProduct = useCallback((data) => {
        const next = {
            id: Date.now(),
            rating: 4.5,
            sku: `PRD-${Date.now()}`,
            ...data,
        };
        setProducts((prev) => [...prev, next]);
        return next;
    }, []);

    const updateProduct = useCallback((id, data) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
        );
    }, []);

    const deleteProduct = useCallback((id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }, []);

    // ── ORDERS ──────────────────────────────────────────────────────────────
    const addOrder = useCallback((orderData) => {
        const next = {
            ...orderData,
            createdAt: new Date().toISOString(),
            status: "pending",
        };
        setOrders((prev) => [next, ...prev]);
        return next;
    }, []);

    const updateOrderStatus = useCallback((id, status) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o)),
        );
    }, []);

    // ── RETURNS ─────────────────────────────────────────────────────────────
    const addReturn = useCallback((data) => {
        const next = {
            id: `RET-${Date.now()}`,
            status: "pending",
            createdAt: new Date().toISOString(),
            ...data,
        };
        setReturns((prev) => [next, ...prev]);
        return next;
    }, []);

    const updateReturnStatus = useCallback((id, status) => {
        setReturns((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r)),
        );
    }, []);

    return (
        <StoreContext.Provider
            value={{
                // Catalogs
                catalogs,
                addCatalog,
                updateCatalog,
                deleteCatalog,
                // Products
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                // Orders
                orders,
                addOrder,
                updateOrderStatus,
                // Returns
                returns,
                addReturn,
                updateReturnStatus,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore must be used within StoreProvider");
    return ctx;
}
