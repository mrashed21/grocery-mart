"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useEffect, useState } from "react";

const Dasboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCards(data.data);
        }
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {cards.map((item, index) => (
        <div
          key={index}
          className="bg-[#084c4ed6] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-2xl font-bold">{item.number}</p>
        </div>
      ))}
    </div>
  );
};

export default Dasboard;
