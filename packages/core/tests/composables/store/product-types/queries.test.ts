import { fixtures } from '../../../../mocks/data';
import { useProductTypes } from '../../../../src/';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useProductTypes hook', () => {
  test('returns product types', async () => {
    const productTypes = fixtures.list('product_type');

    const { vm } = createWrapperComponent(() => useProductTypes());

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.product_types).toEqual(productTypes);
  });
});
