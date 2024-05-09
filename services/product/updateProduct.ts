import { ApiResponse } from '@/types/api';
import { Product } from '@prisma/client';
import axios from 'axios';

export function updateProduct(product: Product) {
  return axios.patch<ApiResponse<Product>>('/api/products', { product });
}
