####Migrating Webpack 

In development, we have used webpack to create a bundle.js in the build folder. We have also used webpack-dev-server to run a build and output to a publicPath. 

When I migrated to http-server, it could not find the bundle. But, by moving bundle.js into the public folder, and changing the relative link in index.html to "bundle.js" , I could load the whole page. Index.html is present in the browser, but it appears as the http address. 

At this point, we are using webpack as a bundler, but it doesn't play a role in deployment. 

---
####Migrating Images 
Loading images as in the Webpack Fundamentals course works when using webpack-dev-server but not when using http server, and I don't know how to migrate it. The best option here is to finish the course and study more on express with webpack. 
