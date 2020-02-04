const fs = require('fs-extra');

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'simple-graphql-to-typescript (sgts)',
      description: 'Opiniated GraphQL code generator made simple!',
    },
  },
  plugins: [
    [
      'autometa',
      {
        canonical_base: 'https://simple-graphql-to-typescript.netlify.com',
      },
    ],
    'tabs',
  ],
  head: [
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://simple-graphql-to-typescript.netlify.com/assets/logo.png',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://simple-graphql-to-typescript.netlify.com/assets/logo.png',
      },
    ],
  ],
  themeConfig: {
    repo: 'victorgarciaesgi/simple-graphql-to-typescript',
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: 'Last Updated',
    logo: '/assets/logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        sidebar: {
          '/': getMainSidebar(),
        },
        nav: [
          {
            text: 'Configuration',
            link: '/configuration/',
          },
          {
            text: 'Options',
            link: '/options/',
          },
        ],
      },
    },
  },
};

function getMainSidebar() {
  return [
    {
      title: 'Guide',
      collapsable: false,
      children: ['/guide/'],
    },
    {
      title: 'Configuration',
      collapsable: false,
      children: ['/configuration/', '/configuration/config', '/configuration/runtime'],
    },
    {
      title: 'Options',
      collapsable: false,
      children: [
        '/options/',
        '/options/endpoint',
        '/options/json',
        '/options/output',
        '/options/codegen-methods',
        '/options/codegen-hooks',
        '/options/codegen-templates',
        '/options/compileToJs',
        '/options/customScalars',
        '/options/prefix',
        '/options/suffix',
        '/options/header',
      ],
    },
  ];
}
