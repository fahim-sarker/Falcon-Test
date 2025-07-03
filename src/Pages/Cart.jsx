import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Container from "../Components/Shared/Container";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [selectAll, setSelectAll] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCart((items) =>
      items.map((item) => ({ ...item, selected: newSelectAll }))
    );
  };

  const handleItemSelect = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleQuantityChange = (id, change) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const formattedTotal = totalPrice.toFixed(2);

  return (
    <section className="pt-3 lg:pb-[110px] pb-[30px] xl:px-0 px-4 bg-gray-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-300 gap-3">
              <h1 className="text-lg font-medium text-gray-900">
                My Cart ({cart.length})
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-3 h-3"
                  />
                  <span>Select All</span>
                </label>
                <button
                  className="hover:text-gray-800"
                  onClick={() => setCart([])}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded p-4 border"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={item.selected || false}
                        onChange={() => handleItemSelect(item.id)}
                        className="w-3 h-3"
                      />
                      <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">🏪</span>
                      </div>
                      <span className="text-sm text-gray-700">BD FASHION HOUSE</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded bg-blue-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Color: {item.color || "N/A"}, Size: {item.size || "N/A"}
                      </p>
                      <div className="flex items-center space-x-2 mt-4">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm px-2">
                          {item.quantity.toString().padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          ৳{item.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ৳{item.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">
                Order summary
              </h2>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Price ({selectedItems.length} items)
                  </span>
                  <span>৳{formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping fee</span>
                  <span className="text-blue-500 text-xs">To be added</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo / Rakun coupon"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 mb-2 sm:mb-0"
                />
                <button className="px-4 py-2 bg-teal-500 text-white rounded text-sm hover:bg-teal-600 cursor-pointer">
                  Apply
                </button>
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Sub Total</span>
                  <span>৳{formattedTotal}</span>
                </div>
              </div>

              <button className="w-full bg-teal-500 text-white py-2 rounded text-sm font-medium hover:bg-teal-600 mb-3 cursor-pointer">
                Proceed to Checkout
              </button>

              <label className="flex items-start space-x-2 text-xs text-gray-600 cursor-pointer break-words">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-3 h-3 mt-0.5 flex-shrink-0"
                />
                <span>
                  I have read and agree to the Terms and Conditions, Privacy
                  Policy and Refund and Return Policy
                </span>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
