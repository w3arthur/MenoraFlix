module.exports = {  //npx react-native link
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ["./assets/fonts/"], // stays the same
  dependencies: {
    'react-native-vector-icons': {  //react-native link react-native-vector-icons
      platforms: {
        ios: null,
      },
    },
  },
};