const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const express_enforces_ssl = require('express-enforces-ssl');
const ms = require('ms');

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"], 
    scriptSrc: ["'self'", 'cdnjs.cloudflare.com']
  }
}));

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(express_enforces_ssl());
  app.use(helmet.hsts({
    maxAge: ms('1 year'),
    includeSubdomains: true
  }));
  app.use(compression());
}

app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: ms('1y'), 
  lastModified: true
}));

app.listen(port, () => {
  console.log("Listening on port:" + port);
});

