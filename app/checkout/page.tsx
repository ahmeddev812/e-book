"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ChevronLeft, ChevronRight, Check, CreditCard, Wallet,
  Lock, Truck, ShieldCheck, BookOpen,
} from "lucide-react";
import { useCartContext } from "@/components/layout/CartContext";

const steps = ["Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { cart, cartTotal, clearCart } = useCartContext();
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", zip: "", country: "US" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderNum, setOrderNum] = useState("");

  useEffect(() => { setMounted(true); document.title = "Checkout — BookHaven"; }, []);

  useEffect(() => {
    if (mounted && !isSignedIn) { router.push("/sign-in"); }
  }, [mounted, isSignedIn, router]);

  useEffect(() => {
    if (mounted && cart.length === 0 && !completed) { router.push("/cart"); }
  }, [mounted, cart, completed, router]);

  const subtotal = cartTotal / 100;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const placeOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setOrderNum(`BH-${Date.now().toString(36).toUpperCase()}`);
    setCompleted(true);
    clearCart();
    setProcessing(false);
  };

  if (!mounted) return <div className="pt-28 pb-12 min-h-screen" />;
  if (completed) {
    return (
      <main className="pt-28 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Order #{orderNum}</p>
          <p className="text-sm text-gray-400 mb-8">A confirmation email has been sent to {form.email}</p>
          <div className="space-y-3">
            <Link href="/account/library" className="block w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
              Go to My Library
            </Link>
            <Link href="/" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
            <Link href="/cart" className="hover:text-gray-600">Cart</Link><span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
        </motion.div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 sm:gap-4">
              <div className={`flex items-center gap-2 ${i <= step ? "text-blue-600" : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i < step ? "bg-blue-600 text-white" : i === step ? "bg-blue-50 text-blue-600 border-2 border-blue-600" : "bg-gray-100 text-gray-400"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${i <= step ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Truck className="w-5 h-5 text-blue-600" /> Delivery Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Address</label>
                      <input type="text" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123 Main St" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">City</label>
                        <input type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="New York" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">ZIP Code</label>
                        <input type="text" value={form.zip} onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10001" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={() => setStep(1)} disabled={!form.email || !form.name} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" /> Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
                      { id: "wallet", label: "Digital Wallet", icon: Wallet, desc: "Apple Pay, Google Pay, PayPal" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === m.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === m.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                          <m.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm text-gray-900">{m.label}</div>
                          <div className="text-xs text-gray-500">{m.desc}</div>
                        </div>
                        {paymentMethod === m.id && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => setStep(2)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                      Review Order <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-600" /> Review Order</h2>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Delivery</p>
                      <p className="text-sm font-medium text-gray-900">{form.name}</p>
                      <p className="text-sm text-gray-500">{form.email}</p>
                      <p className="text-sm text-gray-500">{form.address}, {form.city} {form.zip}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Payment</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">{paymentMethod === "card" ? "Credit / Debit Card" : "Digital Wallet"}</p>
                      </div>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-10 h-14 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${((item.price * item.quantity) / 100).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button
                      onClick={placeOrder}
                      disabled={processing}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                      {processing ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                      ) : (
                        <><Lock className="w-4 h-4" /> Place Order — ${total.toFixed(2)}</>
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-28">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-8 h-11 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="32px" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold text-gray-900">${((item.price * item.quantity) / 100).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 justify-center">
                <Lock className="w-3 h-3" /> Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
