import { Link } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <div className="flex justify-between items-center p-4 border-b">

      <Link href="/" className="text-xl font-bold">
        TOPECO
      </Link>

      <div className="relative">
        <Link href="/cart">
          <ShoppingCart className="w-6 h-6" />
        </Link>

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>

    </div>
  );
};

export default Navbar;