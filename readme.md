
## Dev Envinonment Setup

* Install Node.js & NPM
* Run `npm install` in the project directory to install local dependencies
* Run `npm run serve` to run a local dev environment
* Access dev copy of the site at [localhost:8080](http://localhost:8080)


## NPM Scripts

Explaination of the available npm scripts for this project


### fetch-data

`npm run fetch-data`

This runs the script `_sessionize/fetchData.js` to fetch data from 
the Sessionize API, do some processing, and store it as json files in the 
`_data` directory.


### build

`npm run build`

This runs the command `npx eleventy` to build the site into the docs 
directory.  The docs directory is used for deployment to github pages.

### serve

`npm run serve`

This runs the command `npx eleventy --serve` which builds the site, then 
continues to watch and rebuild the site when file changes are detected.  
It also runs a local webserver and makes the site available at 
[localhost:8080](http://localhost:8080)



