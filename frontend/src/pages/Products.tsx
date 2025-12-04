import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, type Product } from '../api/products';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        const loadingState: Record<string, boolean> = {};
        data.forEach(product => {
          if (product.images && product.images.length > 0) {
            loadingState[product.id] = true;
          }
        });
        setImageLoading(loadingState);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-bloodRush">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Products</h1>
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/products/${product.id}`)}
            className="border border-improbable rounded p-4 flex gap-4 cursor-pointer hover:border-sightful"
          >
            <div className="w-48 h-48 rounded flex overflow-hidden relative">
              {product.images && product.images.length > 0 && !imageError[product.id] ? (
                <>
                  {imageLoading[product.id] && (
                    <div className="absolute inset-0 bg-milkGlass flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-improbable border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {/* TODO: Add correct styling when images load correctly   */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onLoad={() => setImageLoading(prev => ({ ...prev, [product.id]: false }))}
                    onError={() => {
                      setImageLoading(prev => ({ ...prev, [product.id]: false }));
                      setImageError(prev => ({ ...prev, [product.id]: true }));
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-milkGlass flex items-center justify-center">
                  <span className="text-improbable text-center">{imageError[product.id] ? 'Image unavailable' : 'No image'}</span>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between mb-2 items-start gap-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  variant="primary"
                  size="md"
                >
                  Add to Cart
                </Button>
              </div>
              <p className="text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold">${product.price}</span>
                {product.stock === 0 && (
                  <span className="text-sm bg-bloodRush text-milkGlass px-2 py-1 rounded">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="mt-auto">
                <span className="text-sm">⭐ {product.rating} ({product.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
