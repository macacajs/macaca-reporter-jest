'use strict';

const path = require('path');

module.exports = {
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  resolveTestFilePath: (context, filePath) => {
    const { rootDir = process.cwd() } = context.globalConfig;
    const p = path.relative(rootDir, filePath);
    return `./${p}`;
  },
};
