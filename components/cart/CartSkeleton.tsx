"use client";

export function CartSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-10" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border border-gray-100">
              <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg bg-gray-100 animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-96">
          <div className="rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
