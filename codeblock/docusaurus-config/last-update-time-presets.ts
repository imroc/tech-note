presets: [
  [
    'classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        // highlight-next-line
        showLastUpdateTime: true,
      },
      blog: {
        routeBasePath: '/blog',
        blogTitle: '我的博客',
        // highlight-next-line
        showLastUpdateTime: true,
      },
    }),
  ],
]
