import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-close-line text-3xl text-red-600"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">Your payment was cancelled. No charges were made.</p>
        <Link
          href="/cart"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
}
