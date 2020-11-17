const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  styledComponents: {
    fileName: true,
    displayName: isDev,
  },
};
