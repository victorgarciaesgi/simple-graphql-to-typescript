import { SgtsConfig } from '../../src';

export const sharedOptions: Partial<SgtsConfig> = {
  prefix: 'I',
  suffix: 'Model',
  customScalars: {
    DateTime: 'Date',
  },
  header: 'Authorization=JWT blahblahblah',
};
