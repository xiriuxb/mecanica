import {CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';

export const mascaraDinero: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: '$',
  suffix: ' usd',
  thousands: ' '
};
