import { sgtsGenerate } from '../../src';
import { sharedOptions } from './shared.options';

jest.setTimeout(10000);

describe('Test Vue Hooks generation from different sources', () => {
  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      codegenVueHooks: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });
});
