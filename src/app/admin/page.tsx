"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatINR } from "@/lib/utils";

interface Order {
  id: string;
  product: "standard" | "customised";
  quantity: number;
  amount_paise: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  async function loadOrders() {
    const response = await fetch("/api/admin/orders");
    if (!response.ok) {
      setAuthenticated(false);
      return;
    }
    const data = (await response.json()) as { orders: Order[] };
    setOrders(data.orders);
    setAuthenticated(true);
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("Invalid password.");
      return;
    }
    setPassword("");
    await loadOrders();
  }

  if (!authenticated) {
    return (
      <main className="shell flex min-h-[70vh] items-center justify-center py-section">
        <form onSubmit={login} className="w-full max-w-sm rounded-card bg-[#FDFBF7] p-8 shadow-soft">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">Ama Parba</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-earth-900">Order dashboard</h1>
          <label className="mt-6 block text-sm font-semibold text-earth-700">
            Admin password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-panel border border-earth/20 bg-white px-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20"
            />
          </label>
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
          <button className="mt-5 min-h-11 w-full rounded-pill bg-maroon px-5 font-semibold text-ivory">
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="shell py-section">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">Ama Parba</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-earth-900">Orders</h1>
        </div>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            setAuthenticated(false);
          }}
          className="rounded-pill border border-earth/20 px-4 py-2 text-sm text-earth-700"
        >
          Sign out
        </button>
      </div>
      <div className="mt-8 grid gap-5">
        {orders.map((order) => (
          <article key={order.id} className="rounded-card bg-[#FDFBF7] p-6 shadow-soft">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-earth-900">{order.customer_name}</h2>
                <p className="text-sm text-earth-600">
                  {order.product === "standard" ? "Standard" : "Personalised"} · {order.quantity} box
                  {order.quantity > 1 ? "es" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-maroon">{formatINR(order.amount_paise / 100)}</p>
                <p className="text-xs uppercase text-earth-500">{order.status}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-1 text-sm text-earth-700 sm:grid-cols-2">
              <p>{order.customer_phone}</p>
              <p>{order.customer_email}</p>
              <p className="sm:col-span-2">
                {order.address_line1}{order.address_line2 ? `, ${order.address_line2}` : ""}, {order.city}, {order.state} - {order.postal_code}
              </p>
            </div>
          </article>
        ))}
        {orders.length === 0 && <p className="text-earth-600">No orders yet.</p>}
      </div>
    </main>
  );
}
