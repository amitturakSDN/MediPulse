
const exclusionList = require('metro-config/src/defaults/exclusionList');
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
    resolver: {
    blacklistRE: exclusionList([/amplify\/#current-cloud-backend\/.*/]),
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json']
    }


};
