// src/context/AuthContext.jsx
// Enhanced with role support: "user" | "admin"
// Default admin seed: admin@store.com / admin123

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

const AuthContext = createContext(null);

const ADMIN_SEED = {
    id: "usr_admin",
    name: "Admin User",
    email: "admin@store.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
};

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("auth_users") || "[]");
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("auth_users", JSON.stringify(users));
}

// Ensure admin seed exists in the user DB
function ensureAdminSeed() {
    const users = getUsers();
    if (!users.some((u) => u.email === ADMIN_SEED.email)) {
        saveUsers([...users, { ...ADMIN_SEED, password: "admin123" }]);
    }
}
ensureAdminSeed();

export function AuthProvider({ children, initialUser }) {
    const [user, setUser] = useState(() => {
        // Priority 1: Laravel Auth (Inertia) – passed from props
        if (initialUser) return initialUser;

        // Priority 2: Local Storage (Fallback for legacy Components)
        try {
            const s = localStorage.getItem("auth_user");
            return s ? JSON.parse(s) : null;
        } catch {
            return null;
        }
    });

    // Sync state when Laravel auth (initialUser) changes
    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
        }
    }, [initialUser]);

    const login = useCallback((email, password) => {
        const users = getUsers();
        const found = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password,
        );

        if (!found)
            return { success: false, error: "Invalid email or password." };

        const { password: _pw, ...safe } = found;
        localStorage.setItem("auth_user", JSON.stringify(safe));
        setUser(safe);

        return { success: true, role: safe.role };
    }, []);

    const register = useCallback((name, email, password) => {
        const users = getUsers();

        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
            return {
                success: false,
                error: "An account with this email already exists.",
            };
        }

        const newUser = {
            id: `usr_${Date.now()}`,
            name,
            email,
            password,
            role: "user",
            createdAt: new Date().toISOString(),
        };

        saveUsers([...users, newUser]);

        const { password: _pw, ...safe } = newUser;
        localStorage.setItem("auth_user", JSON.stringify(safe));
        setUser(safe);

        return { success: true, role: "user" };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("auth_user");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isLoggedIn: !!user,
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
