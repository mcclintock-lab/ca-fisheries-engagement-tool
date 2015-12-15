# ca-fisheries-engagement-tool


## Steps to install

* Clone the repo, and make sure you have node.js > 0.12 installed (use nvm to manage versions)
* `npm install`
* `npm start`


## Updating the tool

* all markdown files in app/methods/*.md can be edited to update stakholder engagement menthod descriptions.
* `data/rankings.csv` holds... all the rankings ;) Just be sure to never edit the id's in files or file names(e.g. `online-fishing-forums`). They gotta match.
* The ranking algorithm can be implemented within `app/components/results.jsx`. Edit Results.calculateRecommendedMethods() to return an array of method templates. The default algo just returns 4 random methods.
