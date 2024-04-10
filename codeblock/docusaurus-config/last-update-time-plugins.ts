plugins: [
  [
    path.resolve(__dirname, './src/plugin/plugin-content-blog'), // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
    {
      // highlight-next-line
      showLastUpdateTime: true,
      blogTitle: '博客',
      routeBasePath: 'blog',
    },
  ]
  [
  /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
  '@docusaurus/plugin-content-docs',
  ({
    id: 'doc1',
    path: 'doc1',
    // highlight-next-line
    showLastUpdateTime: true,
    routeBasePath: '/',
    sidebarPath: require.resolve('./doc1/sidebars.ts'),
  }),
  ],
  [
    /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
    '@docusaurus/plugin-content-docs',
    ({
      id: 'doc2',
      path: 'doc2',
      // highlight-next-line
      showLastUpdateTime: true,
      routeBasePath: '/',
      sidebarPath: require.resolve('./doc2/sidebars.ts'),
    }),
  ],
]
