import React, { useState, useEffect } from "react";
import { Search, Grid, List } from "lucide-react";
import Container from "../Components/Shared/Container";
import ProductCard from "../Components/Shared/ProductCard";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://157.230.240.97:9999/api/v1/categories");
        const result = await response.json();
        if (result.data) {
          const categoriesWithCount = result.data.map((cat) => ({
            ...cat,
            count: cat.subcategories ? cat.subcategories.length : 0,
          }));
          setCategories(categoriesWithCount);

          const params = new URLSearchParams(location.search);
          const categorySlug = params.get("category");

          if (categorySlug) {
            let foundId = null;

            for (const cat of categoriesWithCount) {
              if (cat.slug === categorySlug) {
                foundId = cat.id;
                break;
              }
              if (cat.subcategories) {
                for (const sub of cat.subcategories) {
                  if (sub.slug === categorySlug) {
                    foundId = sub.id;
                    break;
                  }
                  if (sub.subchilds) {
                    for (const subchild of sub.subchilds) {
                      if (subchild.slug === categorySlug) {
                        foundId = subchild.id;
                        break;
                      }
                    }
                  }
                  if (foundId) break;
                }
              }
              if (foundId) break;
            }

            if (foundId) {
              setSelectedCategory(foundId);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [location.search]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      let url = `http://157.230.240.97:9999/api/v1/shop/products?page=${page}`;
      if (selectedCategory) {
        url += `&category_id=${selectedCategory}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = await response.json();

      const transformedProducts = result.data.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.discount_price),
        originalPrice: parseFloat(product.regular_price),
        rating: product.rating_avg || 0,
        reviews: product.rating_count || 0,
        image: product.thumbnail,
        inStock: product.available_stock > 0,
        isNew: product.badges.some((badge) => badge.name === "New"),
        stock: product.available_stock,
        badges: product.badges,
        isVariant: product.is_variant,
      }));

      setProducts(transformedProducts);
      setTotalProducts(result.total);
      setTotalPages(result.last_page);
      setCurrentPage(result.current_page);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedCategory]);

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (error) {
    return <div><h2>{error}</h2></div>;
  }

  return (
    <section className="lg:py-20 py-10 bg-gray-50 xl:px-0 px-4">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(null)}
                      className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={() => fetchProducts(1)}
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Shop</h1>
                  <span className="text-gray-600">
                    ({totalProducts} products, Page {currentPage} of {totalPages})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border rounded-lg px-4 py-2 pr-8 w-full md:w-auto"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <div className="flex items-center border p-1 rounded-lg">
                    <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-teal-500 text-white" : ""}`}><Grid className="w-4 h-4" /></button>
                    <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-teal-500 text-white" : ""}`}><List className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
            {loading && <div className="text-center py-12">Loading...</div>}
            {!loading && (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">No products found.</div>
            )}
            {!loading && totalPages > 1 && (
              <div className="flex flex-wrap justify-center mt-12 space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-100"}`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-teal-500 text-white" : "hover:bg-teal-100"}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-100"}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Shop;
