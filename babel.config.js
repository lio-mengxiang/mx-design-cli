module.exports = {
  presets: [
    require.resolve("@babel/preset-env"),
    require.resolve("@babel/preset-typescript"),
  ],
  plugins: [require.resolve("@babel/plugin-transform-runtime")],
};
