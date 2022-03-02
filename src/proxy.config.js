const proxy = [
  {
    context: '/api/*',
    target: 'https://d1q4tksbbj5r1a.cloudfront.net/sgm',
    secure: true,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;