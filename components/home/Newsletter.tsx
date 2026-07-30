export function Newsletter() {
  return (
    <section className="max-w-3xl mx-auto px-4 mb-16">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Subscribe to get exclusive offers, early access to new releases, and personalized book recommendations.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-button font-medium whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to receive updates from BookHaven.
        </p>
      </div>
    </section>
  );
}
