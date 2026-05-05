// src/pages/NotFound.jsx
import { Link } from "@inertiajs/react";
import { ArrowRight, MapPin } from "lucide-react";
import Button from "@/Components/ui/Button";

export default function NotFound() {
    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-purple-400" />
                </div>
                <p className="text-8xl font-bold text-purple-100 mb-4 select-none">
                    404
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 -mt-12">
                    Page Not Found
                </h1>
                <p className="text-gray-500 max-w-md mx-auto mb-10">
                    Sorry, we couldn&apos;t find the page you&apos;re looking
                    for. It may have been moved or deleted.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" className="gap-2">
                            Back to Home
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="outline" size="lg">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
