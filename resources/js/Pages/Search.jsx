// src/pages/Search.jsx
import { usePage, Link } from "@inertiajs/react";
import { Search as SearchIcon, PackageX } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/Components/ui/ProductCard";
import Button from "@/Components/ui/Button";

export default function SearchPage() {
    const { products } = useStore();
    const { url } = usePage();
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("q") || "";

    const results = query.trim()
        ? products.filter(
              (p) =>
                  p.name.toLowerCase().includes(query.toLowerCase()) ||
                  (p.category || "")
                      .toLowerCase()
                      .includes(query.toLowerCase()) ||
                  (p.description || "")
                      .toLowerCase()
                      .includes(query.toLowerCase()),
          )
        : [];

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Search Results
                </h1>
                {query ? (
                    <p className="text-gray-500">
                        {results.length} result{results.length !== 1 ? "s" : ""}{" "}
                        for &ldquo;{query}&rdquo;
                    </p>
                ) : (
                    <p className="text-gray-500">
                        Enter a search term to find products.
                    </p>
                )}
            </div>

            {/* No query */}
            {!query && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <SearchIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        What are you looking for?
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Use the search bar above to find products.
                    </p>
                    <Link href="/shop">
                        <Button size="lg">Browse All Products</Button>
                    </Link>
                </div>
            )}

            {/* No results */}
            {query && results.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <PackageX className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        No results found
                    </h2>
                    <p className="text-gray-500 mb-6">
                        We couldn&apos;t find anything matching &ldquo;{query}
                        &rdquo;. Try a different keyword.
                    </p>
                    <Link href="/shop">
                        <Button size="lg">Browse All Products</Button>
                    </Link>
                </div>
            )}

            {/* Results Grid */}
            {results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
