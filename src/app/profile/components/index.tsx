"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import { useSession } from "next-auth/react";

const Profile = () => {
  // State to hold profile information
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "john.doe@example.com",
    address: "",
  });

  const { data: session, status } = useSession();

   // State to hold the new address input
  const [newAddress, setNewAddress] = useState("");

  // Load profile from localStorage or API
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (storedProfile.name) {
      setProfile(storedProfile);
    }
    setNewAddress(storedProfile.address)
  }, []);

  // Handle address change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProfile = { ...profile, address: newAddress };
    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
  };

  return (
    <Layout>
      <div className="min-h-screen pt-24 px-12">
        <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Name: {profile?.name}</h2>
          <h2 className="text-xl font-semibold mb-2">Email: {session?.user?.email}</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={newAddress}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Address
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
