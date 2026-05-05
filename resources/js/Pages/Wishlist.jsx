// src/pages/Wishlist.jsx
import { Link } from "@inertiajs/react";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/lib/mockData";
import Button from "@/components/ui/Button";

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAddToCart = (item) => {
        const product = products.find((p) => p.id === item.id);
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            selectedColor: product?.colors?.[0] ?? "Default",
            selectedSize: product?.sizes?.[0] ?? "One Size",
            quantity: 1,
        });
        addToast(`${item.name} added to cart!`, "success");
    };

    const handleRemove = (item) => {
        removeFromWishlist(item.id);
        addToast(`${item.name} removed from wishlist.`, "info");
    };

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Wishlist
                </h1>
                <p className="text-gray-500">
                    {wishlist.length} saved item
                    {wishlist.length !== 1 ? "s" : ""}
                </p>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Heart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Save items you love to your wishlist.
                    </p>
                    <Link href="/shop">
                        <Button size="lg" className="gap-2">
                            Start Shopping
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-[14px] border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                            >
                                <Link
                                    href={`/product/${item.id}`}
                                    className="block"
                                >
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>

                                <div className="p-4">
                                    <Link href={`/product/${item.id}`}>
                                        <p className="text-xs font-medium text-purple-600 mb-1">
                                            {item.category}
                                        </p>
                                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 hover:text-purple-600 transition-colors">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-lg font-semibold text-gray-900 mb-4">
                                        {formatCurrency(item.price)}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="flex-1"
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                        >
                                            Add to Cart
                                        </Button>
                                        <button
                                            onClick={() => handleRemove(item)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[6px] transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link href="/shop">
                            <Button
                                variant="outline"
                                size="lg"
                                className="gap-2"
                            >
                                Continue Shopping
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
