"use client";

import { useUser, UserButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-8">
          <UserButton
            appearance={{
              elements: { userButtonAvatarBox: "w-20 h-20" },
            }}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.fullName || "User"}
            </h2>
            <p className="text-gray-500">
              {user?.primaryEmailAddress?.emailAddress || ""}
            </p>
          </div>
        </div>
        <div className="border-t pt-6 space-y-4">
          <Link
            href="/orders"
            className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Order History
          </Link>
          <Link
            href="/wishlist"
            className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Wishlist
          </Link>
          <div className="border-t pt-4">
            <SignOutButton>
              <button className="text-red-600 hover:text-red-700 px-4 py-2">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
