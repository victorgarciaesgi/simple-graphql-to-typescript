import { sgtsGenerate } from '../../src';
import { sharedOptions } from './shared.options';

jest.setTimeout(10000);

describe('Test simple type generation from different sources', () => {
  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });
});
