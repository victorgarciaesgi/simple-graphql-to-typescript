import { sgtsGenerate } from '../../src';
import { sharedOptions } from './shared.options';

jest.setTimeout(10000);
describe('Test all generations from different sources', () => {
  it('Generates types correctly from graphqlZero', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphqlzero.almansi.me/api',
      codegenMethods: true,
      codegenReactHooks: true,
      codegenVueHooks: true,
      codegenTemplates: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      codegenReactHooks: true,
      codegenTemplates: true,
      codegenVueHooks: true,
      codegenMethods: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });
});
