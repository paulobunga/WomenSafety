module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:react-native-dotenv"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            utils: "./src/utils",
            config: "./config",
            components: "./src/components",
            containers: "./src/containers",
            packages: "./src/packages",
            screens: "./src/screens",
            navigation: "./src/navigation",
            assets: "./src/assets"
          }
        }
      ]
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"]
      }
    }
  };
};
