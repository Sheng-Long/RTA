import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import Button from '../components/Button';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach(({ product }) => {
      if (product.images && product.images.length > 0) {
        initial[product.id] = true;
      }
    });
    return initial;
  });
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Cart</h1>
        <div className="text-center text-improbable">
          <p className="mb-4">Your cart is empty</p>
          <Button
            onClick={() => navigate('/products')}
            variant="primary"
            size="lg"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Cart</h1>
      
      <div className="flex flex-col gap-4 mb-6">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="border border-improbable rounded p-4 flex gap-4 items-center">
            <div className="w-24 h-24 rounded bg-milkGlass flex relative overflow-hidden">
              {product.images && product.images.length > 0 && !imageError[product.id] ? (
                <>
                  {imageLoading[product.id] && (
                    <div className="absolute inset-0 bg-milkGlass flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-improbable border-t-transparent rounded-full animate-spin"></div>
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
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-improbable text-xs text-center">{imageError[product.id] ? 'Image unavailable' : 'No image'}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-sm mb-2">${product.price}</p>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  variant="primary"
                  size="sm"
                  className="border-improbable hover:bg-milkGlass"
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  variant="primary"
                  size="sm"
                  className="border-improbable hover:bg-milkGlass"
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="text-right mr-4">
              <p className="font-bold">${(product.price * quantity).toFixed(2)}</p>
            </div>

            <Button
              onClick={() => removeFromCart(product.id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t border-improbable pt-4">
        <div className="flex justify-end items-center gap-4 mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/products')}
            variant="primary"
            size="lg"
          >
            Continue Shopping
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            disabled 
            className="opacity-50 cursor-not-allowed hover:!bg-sightful"
            title="Upcoming feature"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
