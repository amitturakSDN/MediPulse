const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      extensions: ['.ios.js', '.android.js', '.js', '.json'],
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@containers': './src/containers',
        '@config': './src/config',
        '@actions': './src/actions',
        '@constants': './src/constants',
        '@helpers': './src/helpers',
        '@images': './src/assets/images',
        '@reducers': './src/reducers',
        '@store': './src/store',
        '@utils': './src/utils',
        '@hoc': './src/hoc',
        '@localization': './src/localization',
        '@navigator': './src/navigator',
        '^@/(.+)': './src/\\1', // @/folder will be an alias to <root>/src/folder
      },
    },
    'react-native-reanimated/plugin',
  ],
];
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
    plugins: [...commonPlugins, 
      [
        'react-native-reanimated/plugin', {
            relativeSourceLocation: true,
        },
    ]
    ],
};
