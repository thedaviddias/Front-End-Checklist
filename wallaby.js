
module.exports = function (wallaby) {
  return {
    files: [
      './src/scripts/**/*.js'
    ],

    tests: [
      'test/**/*.js'
    ]
  };
};
