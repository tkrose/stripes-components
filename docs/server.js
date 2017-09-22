/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const devConfig = require('../webpack.config');

const express = require('express');
const app = express();

const config = Object.assign({}, devConfig);
const compiler = webpack(config);

const port = 8080;
const host = 'localhost';

app.use(express.static(__dirname + '/public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + host + ':' + port);
});
