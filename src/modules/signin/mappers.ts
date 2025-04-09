import get from 'lodash/get';

import * as Types from './types';

export const CheckPhone = (item?: unknown): Types.IEntity.CheckPhone => ({
  authRequireCellular: {
    key: get(item, 'authRequireCellular.key') || '',
    type: get(item, 'authRequireCellular.type') || '',
    value: get(item, 'authRequireCellular.value') || false
  },
  exists: get(item, 'exists') || false
});
