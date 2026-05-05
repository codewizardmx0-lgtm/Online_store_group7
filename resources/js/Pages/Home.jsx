// resources/js/Pages/Home.jsx
import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    Truck,
    Shield,
    RefreshCcw,
    HeadphonesIcon,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";

function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-purple-50 to-white overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                            New Collection 2024
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Discover Your
                            <span className="text-purple-600">
                                {" "}
                                Perfect Style
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-md">
                            Explore our curated collection of premium products
                            designed for modern living. Quality meets style.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/shop">
                                <Button size="lg" className="gap-2">
                                    Shop Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button variant="outline" size="lg">
                                    Browse Categories
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop"
                            alt="Featured products"
                            className="relative rounded-[14px] shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    const features = [
        { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
        { icon: Shield, title: "Secure Payment", desc: "100% protected" },
        {
            icon: RefreshCcw,
            title: "Easy Returns",
            desc: "30-day return policy",
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            desc: "Dedicated support",
        },
    ];

    return (
        <section className="border-y border-gray-200 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex items-center gap-3"
                        >
                            <div className="p-2.5 bg-purple-100 rounded-[10px]">
                                <feature.icon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 text-sm">
                                    {feature.title}
                                </h4>
                                <p className="text-xs text-gray-500">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Categories({ categories }) {
    return (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Shop by Category
                    </h2>
                    <p className="text-gray-500 mt-1">Find what you need</p>
                </div>
                <Link
                    href="/shop"
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/shop?category=${category.name.toLowerCase()}`}
                        className="group relative overflow-hidden rounded-[14px] aspect-square"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-medium">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function FeaturedProducts({ products }) {
    const featuredProducts = products.slice(0, 4);

    return (
        <section className="bg-white py-16">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Featured Products
                        </h2>
                        <p className="text-gray-500 mt-1">Handpicked for you</p>
                    </div>
                    <Link
                        href="/shop"
                        className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Newsletter() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-purple-600 rounded-[14px] p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-purple-100 mb-6 max-w-md mx-auto">
                    Get the latest updates on new products and upcoming sales.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 h-12 px-4 rounded-[10px] border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-white"
                    />
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-white text-purple-600 border-white hover:bg-purple-50"
                    >
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    // ✅ نقرأ من المتجر الموحّد بدل mockData المنفصل
    const { products, catalogs } = useStore();

    return (
        <>
            <Hero />
            <Features />
            <Categories categories={catalogs} />
            <FeaturedProducts products={products} />
            <Newsletter />
        </>
    );
}
