import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../../Context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const notify = () => toast('Product Added to Cart.');


  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        thumbnail: product.image || product.thumbnail || "/placeholder.svg",
        price: Number(product.price) || 0,
      },
      1
    );
    notify()
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300 cursor-pointer p-3">
      <Link to={`/product-details/${product.slug}`}>
        <div className="relative hover:scale-105 duration-300 ease-in-out">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-2 left-2 space-y-1">
              {product.badges.map((badge) => (
                <span
                  key={badge.id}
                  className={`block text-white text-xs px-2 py-1 rounded ${badge.type === 4 ? "bg-blue-500" : "bg-green-500"
                    }`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-t-lg">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ৳{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <span className="text-xs text-green-600 font-medium">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                100
              )}
              % OFF
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">
            Stock: {product.stock}
          </span>
          {product.isVariant && (
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
              Variants Available
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${product.inStock
            ? "bg-teal-500 text-white hover:bg-teal-600"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          <ShoppingCart className="w-4 h-4 inline mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
