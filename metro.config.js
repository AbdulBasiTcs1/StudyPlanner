// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("./node_modules/nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
