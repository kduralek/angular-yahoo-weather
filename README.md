# Yahoo Weather Simple App
   
## Installation
Start with downloading NPM and JSPM packages:

    npm install
    jspm install
  
## Development     
### Run development server with sass files watcher
    
    gulp serve-dev 
    
Then open your browser `http://localhost:7203`    
   
### Create production-ready package

    gulp release 
    
### Test production-ready package
    gulp serve-build 

Then open your browser `http://localhost:7203` 
    
##  Yahoo! Weather Webservice 
When using default port on bundled web server: 

* To get weather forecast for single location use single zipcode as parameter: `http://localhost:7203/api/weather/:zipcode`   
* To get weather forecast for multiple locations use comma separated list: `http://localhost:7203/api/weather/:zipcode1,:zipcode2,:zipcode3`     
   
