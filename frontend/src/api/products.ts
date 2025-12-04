import api from './internal/axios';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number;
  categoryId: string;
  sellerId: string;
  images: string[];
  stock: number;
  sku: string;
  status: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get<GetProductsResponse>('/products');
    return response.data.data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await api.get(`/products/${id}`);
    console.log('Products response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
}
