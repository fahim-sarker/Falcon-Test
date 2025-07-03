import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import { FaStar } from 'react-icons/fa6';
import { HiChevronDown } from 'react-icons/hi';
import { IoIosHeartEmpty } from 'react-icons/io';
import { BsShare } from 'react-icons/bs';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { CheckCircle, MessageCircle, Package, Truck } from "lucide-react";
import { useCart } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const sizes = ["XL", "XS", "S", "M", "L"];

const ProductsDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/shop/product/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        const thumbnailProxy = data.data.thumbnail
          ? `https://images.weserv.nl/?url=${encodeURIComponent(
            data.data.thumbnail.replace(/^https?:\/\//, "")
          )}`
          : "";

        const imagesProxy = (data.data.images || []).map(img => ({
          ...img,
          url: img.url
            ? `https://images.weserv.nl/?url=${encodeURIComponent(
              img.url.replace(/^https?:\/\//, "")
            )}`
            : ""
        }));

        setProduct({
          ...data.data,
          thumbnail: thumbnailProxy,
          images: imagesProxy
        });

        setSelectedImage(thumbnailProxy);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        thumbnail: product.thumbnail,
        price: Number(product.discount_price) || 0,
      },
      quantity
    );
    toast("Added to cart successfully!");
    navigate("/cart");
  };

  if (loading) return <div className="p-8 text-center">Loading product details...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <section className='bg-white py-6 xl:px-0 px-4'>
      <Container>
        <div className="flex flex-col lg:flex-row gap-y-10 gap-x-10">
          <div className="w-full lg:w-[380px]">
            <figure>
              <img src={selectedImage} alt={product.name} className='h-[380px] w-full object-cover rounded' />
            </figure>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {[
                { url: product.thumbnail },
                ...(product.images || [])
              ].map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt={`${product.name} image ${i + 1}`}
                  className="w-16 h-16 object-cover cursor-pointer rounded border border-gray-300 flex-shrink-0"
                  onClick={() => setSelectedImage(image.url)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 w-full lg:w-[507px]">
            <h2 className='font-onset text-[#0F172A] text-[20px] font-medium'>{product.name}</h2>

            <div className="flex flex-wrap justify-between items-center py-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#475569] font-onset">{product.rating_avg?.toFixed(1) || "0.0"}</span>
                <div className="flex items-center gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-amber-400 size-4 ${i < Math.floor(product.rating_avg) ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#475569] font-onset">{product.rating_count || 0}</span>
                <HiChevronDown className="text-gray-500 size-4" />
              </div>
              <div className="flex items-center gap-3">
                <IoIosHeartEmpty className="size-8 cursor-pointer" />
                <BsShare className="size-8 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-4 py-4">
              <span className="text-[#00A788] text-[24px] font-semibold font-onset">৳{product.discount_price}</span>
              <span className="line-through text-gray-500 font-onset text-sm">৳{product.regular_price}</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Select Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 text-sm font-medium ${selectedSize === size
                        ? "border-2 border-green-500 bg-white text-gray-900 rounded-lg"
                        : "border border-gray-500 text-gray-600 rounded-lg"
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center gap-4 border border-gray-400 rounded-lg w-fit p-1">
                  <button
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <BiMinus className="w-4 h-4" />
                  </button>

                  <span className="text-lg font-medium min-w-[2rem] text-center">{quantity.toString().padStart(2, "0")}</span>

                  <button
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <BiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-base font-medium cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[313px]">
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Options</h3>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Regular</div>
                    <div className="text-sm text-gray-500">Delivery within 2-3 days</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-400">Express</span>
                      <span className="text-xs text-red-500 font-medium">Not Available</span>
                    </div>
                    <div className="text-sm text-gray-400">Delivery within 24 hours</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Sold by</h4>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P&G</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">BD FASHION HOUSE</span>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 text-white text-xs font-medium">
                  Rising Star
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg border border-teal-200 hover:bg-teal-100">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Chat Now</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <span className="text-sm font-medium">View Shop</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4 text-center">
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Ship on Time</div>
                      <div className="text-2xl text-gray-500">100%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Chat Response</div>
                      <div className="text-2xl text-gray-500">90%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Shop Rating</div>
                      <div className="text-2xl text-gray-500">99.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ProductsDetails;
