// src/pages/Checkout.jsx
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import {
    CreditCard,
    Truck,
    ChevronLeft,
    Check,
    Lock,
    Banknote,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";

function validateStep1(d) {
    const e = {};
    if (!d.fullName.trim()) e.fullName = "Full name is required.";
    if (!d.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(d.email)) e.email = "Enter a valid email.";
    if (!d.phone.trim()) e.phone = "Phone number is required.";
    if (!d.country.trim()) e.country = "Country is required.";
    if (!d.city.trim()) e.city = "City is required.";
    if (!d.address.trim()) e.address = "Address is required.";
    if (!d.zip.trim()) e.zip = "ZIP code is required.";
    return e;
}

function validateStep2(d, pm) {
    const e = {};
    if (pm === "card") {
        const raw = d.cardNumber.replace(/\s/g, "");
        if (!raw || raw.length < 13)
            e.cardNumber = "Enter a valid card number.";
        if (!d.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(d.cardExpiry))
            e.cardExpiry = "Format: MM/YY";
        if (!d.cardCvc.trim() || !/^\d{3,4}$/.test(d.cardCvc))
            e.cardCvc = "Enter 3-4 digits.";
        if (!d.cardName.trim()) e.cardName = "Cardholder name is required.";
    }
    return e;
}

function StepIndicator({ step }) {
    const steps = ["Customer Info", "Payment", "Review"];
    return (
        <div className="flex items-center gap-2 mb-8">
            {steps.map((s, idx) => (
                <div key={s} className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                            step > idx + 1
                                ? "bg-green-500 text-white"
                                : step === idx + 1
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-200 text-gray-500",
                        )}
                    >
                        {step > idx + 1 ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            idx + 1
                        )}
                    </div>
                    <span
                        className={cn(
                            "text-sm font-medium hidden sm:inline",
                            step === idx + 1
                                ? "text-gray-900"
                                : "text-gray-400",
                        )}
                    >
                        {s}
                    </span>
                    {idx < 2 && (
                        <div className="w-8 sm:w-12 h-0.5 bg-gray-200 mx-1" />
                    )}
                </div>
            ))}
        </div>
    );
}

function OrderSidebar({ cart, subtotal, shipping, tax, grandTotal }) {
    return (
        <div className="bg-white rounded-[14px] border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Order Summary
            </h3>
            <div className="space-y-3 pb-5 border-b border-gray-100 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3">
                        <div className="relative flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-[6px]"
                            />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {item.selectedColor} / {item.selectedSize}
                            </p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
            </div>
            <div className="space-y-2 py-4 border-b border-gray-100 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "Free" : formatCurrency(shipping)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span>{formatCurrency(tax)}</span>
                </div>
            </div>
            <div className="flex justify-between py-4 font-semibold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-xs text-gray-400 mt-2">
                <Lock className="w-3 h-3" />
                <span>Secure 256-bit SSL encryption</span>
            </div>
        </div>
    );
}

export default function Checkout() {
    const { cart, subtotal, shipping, total, clearCart } = useCart();
    const { addOrder } = useStore();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: "",
        email: user?.email || "",
        phone: "",
        country: "",
        city: "",
        address: "",
        zip: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        cardName: "",
    });

    useEffect(() => {
        if (cart.length === 0 && !orderPlaced) {
            router.visit("/cart", { replace: true });
        }
    }, [cart.length, orderPlaced]);

    if (cart.length === 0 && !orderPlaced) return null;

    const tax = subtotal * 0.08;
    const grandTotal = total + tax;

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "cardNumber")
            value = value
                .replace(/\D/g, "")
                .slice(0, 16)
                .replace(/(.{4})/g, "$1 ")
                .trim();
        if (name === "cardExpiry") {
            value = value.replace(/\D/g, "").slice(0, 4);
            if (value.length >= 3)
                value = value.slice(0, 2) + "/" + value.slice(2);
        }
        if (name === "cardCvc") value = value.replace(/\D/g, "").slice(0, 4);
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    };

    const goToStep2 = () => {
        const e = validateStep1(formData);
        if (Object.keys(e).length) {
            setErrors(e);
            return;
        }
        setErrors({});
        setStep(2);
    };

    const goToStep3 = () => {
        const e = validateStep2(formData, paymentMethod);
        if (Object.keys(e).length) {
            setErrors(e);
            return;
        }
        setErrors({});
        setStep(3);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
        const orderData = {
            id: orderId,
            userId: user?.id || "guest",
            customerName: formData.fullName,
            email: formData.email,
            items: [...cart],
            subtotal,
            shipping,
            tax,
            grandTotal,
            paymentMethod,
            address: {
                country: formData.country,
                city: formData.city,
                addressLine: formData.address,
                zip: formData.zip,
            },
        };
        addOrder(orderData);
        setOrderPlaced(true);
        clearCart();
        addToast("🎉 Order placed successfully!", "success", 5000);
        router.visit("/order-success", {
            data: { order: orderData },
            replace: true,
        });
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Cart
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Checkout
                </h1>
                <StepIndicator step={step} />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[14px] border border-gray-200 p-6 sm:p-8">
                            {/* Step 1 */}
                            {step === 1 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                        Customer Information
                                    </h2>
                                    <div className="space-y-4 mb-8">
                                        <Input
                                            label="Full Name"
                                            name="fullName"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            error={errors.fullName}
                                        />
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                error={errors.email}
                                            />
                                            <Input
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                error={errors.phone}
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                        Shipping Address
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Country"
                                                name="country"
                                                placeholder="United States"
                                                value={formData.country}
                                                onChange={handleChange}
                                                error={errors.country}
                                            />
                                            <Input
                                                label="City"
                                                name="city"
                                                placeholder="New York"
                                                value={formData.city}
                                                onChange={handleChange}
                                                error={errors.city}
                                            />
                                        </div>
                                        <Input
                                            label="Street Address"
                                            name="address"
                                            placeholder="123 Main Street"
                                            value={formData.address}
                                            onChange={handleChange}
                                            error={errors.address}
                                        />
                                        <Input
                                            label="ZIP / Postal Code"
                                            name="zip"
                                            placeholder="10001"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            error={errors.zip}
                                        />
                                    </div>
                                    <Button
                                        className="w-full mt-8"
                                        size="lg"
                                        onClick={goToStep2}
                                    >
                                        Continue to Payment
                                    </Button>
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                        Payment Method
                                    </h2>
                                    <div className="space-y-3 mb-6">
                                        {[
                                            {
                                                id: "card",
                                                label: "Credit / Debit Card",
                                                Icon: CreditCard,
                                            },
                                            {
                                                id: "cod",
                                                label: "Cash on Delivery",
                                                Icon: Banknote,
                                            },
                                        ].map(({ id, label, Icon }) => (
                                            <label
                                                key={id}
                                                className={cn(
                                                    "flex items-center gap-4 p-4 rounded-[10px] border cursor-pointer transition-all",
                                                    paymentMethod === id
                                                        ? "border-purple-600 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300",
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={id}
                                                    checked={
                                                        paymentMethod === id
                                                    }
                                                    onChange={() => {
                                                        setPaymentMethod(id);
                                                        setErrors({});
                                                    }}
                                                    className="w-4 h-4 text-purple-600"
                                                />
                                                <Icon className="w-5 h-5 text-gray-600" />
                                                <span className="font-medium text-gray-900">
                                                    {label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {paymentMethod === "card" && (
                                        <div className="space-y-4 pt-4 border-t border-gray-200">
                                            <Input
                                                label="Card Number"
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                error={errors.cardNumber}
                                                inputMode="numeric"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="Expiry (MM/YY)"
                                                    name="cardExpiry"
                                                    placeholder="MM/YY"
                                                    value={formData.cardExpiry}
                                                    onChange={handleChange}
                                                    error={errors.cardExpiry}
                                                    inputMode="numeric"
                                                />
                                                <Input
                                                    label="CVC"
                                                    name="cardCvc"
                                                    placeholder="123"
                                                    value={formData.cardCvc}
                                                    onChange={handleChange}
                                                    error={errors.cardCvc}
                                                    inputMode="numeric"
                                                />
                                            </div>
                                            <Input
                                                label="Cardholder Name"
                                                name="cardName"
                                                placeholder="Name as shown on card"
                                                value={formData.cardName}
                                                onChange={handleChange}
                                                error={errors.cardName}
                                            />
                                        </div>
                                    )}
                                    {paymentMethod === "cod" && (
                                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-[10px]">
                                            <p className="text-sm text-amber-800">
                                                You will pay in cash when your
                                                order is delivered.
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            size="lg"
                                            onClick={goToStep3}
                                        >
                                            Review Order
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 */}
                            {step === 3 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                        Review Your Order
                                    </h2>
                                    <div className="mb-4 p-4 bg-gray-50 rounded-[10px] flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Truck className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    Shipping Address
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {formData.fullName}
                                                <br />
                                                {formData.address},{" "}
                                                {formData.city},{" "}
                                                {formData.country}{" "}
                                                {formData.zip}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex-shrink-0"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="mb-6 p-4 bg-gray-50 rounded-[10px] flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <CreditCard className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    Payment
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {paymentMethod === "card"
                                                    ? `Card ending in ${formData.cardNumber.replace(/\s/g, "").slice(-4) || "****"}`
                                                    : "Cash on Delivery"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setStep(2)}
                                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex-shrink-0"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div
                                                key={item.cartItemId}
                                                className="flex gap-4 items-center"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-[6px] bg-gray-100"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.selectedColor} /{" "}
                                                        {item.selectedSize} ×{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <span className="font-medium text-gray-900">
                                                    {formatCurrency(
                                                        item.price *
                                                            item.quantity,
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => setStep(2)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1 gap-2"
                                            size="lg"
                                            onClick={handlePlaceOrder}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                    Placing order...
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-4 h-4" />
                                                    Place Order —{" "}
                                                    {formatCurrency(grandTotal)}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <OrderSidebar
                        cart={cart}
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        grandTotal={grandTotal}
                    />
                </div>
            </div>
        </div>
    );
}
