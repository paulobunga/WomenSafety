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
            packages: "./src/packages"
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
