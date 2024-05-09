import AddProductsPage from '@/components/pages/AddProducts';
import { withAuth } from '@/lib/auth/hoc';
import { getAllProducts } from '@/services/product';

export default withAuth(async () => {
  const products = await getAllProducts<{ optionId: string }>({ keys: ['optionId'] });
  const existingOptionIds = products.map(({ optionId }) => optionId);

  return <AddProductsPage existingOptionIds={existingOptionIds} />;
});
