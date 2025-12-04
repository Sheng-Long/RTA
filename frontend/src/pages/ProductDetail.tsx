import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, type Product } from '../api/products';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/products');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-bloodRush">{error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6 mx-auto max-w-[1440px]">
      <Button
        onClick={() => navigate('/products')}
        variant="primary"
        size="md"
        className="mb-6"
      >
        ← Back to Products
      </Button>

      <div className="flex gap-6">
        <div className="w-96 h-96 flex-shrink-0 rounded bg-milkGlass flex relative overflow-hidden">
          {product.images && product.images.length > 0 && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-milkGlass flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-improbable border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {/* TODO: Add correct styling when images load correctly   */}
              <img
                src={product.images[0]}
                alt={product.name}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-improbable text-center">{imageError ? 'Image unavailable' : 'No image'}</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <p className="text-sm mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-sm">⭐ {product.rating} ({product.reviewCount} reviews)</span>
            <span className="ml-4 text-sm">{product.stock} in stock</span>
          </div>

          <Button 
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
