import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// highlight-start
import FileBlock from '@site/src/components/FileBlock';
import Tabs from '@theme-original/Tabs';
import TabItem from '@theme-original/TabItem';
import CodeBlock from '@theme-original/CodeBlock';
// highlight-end

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // highlight-start
  // Add more components to be imported by default
  CodeBlock,
  FileBlock,
  Tabs,
  TabItem,
  // highlight-end
};
