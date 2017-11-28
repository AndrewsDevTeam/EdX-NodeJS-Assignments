const fs = require('fs');
const path = require('path');
const csvConv = require('csvtojson');

//Create Variable for CSV File and JSON file
var csvFile = path.join(__dirname, 'customer-data.csv');
var jsonFile = path.join(__dirname, 'jsonfile.json');

createFile();

// Read CSV file and convert to JSON using csvtojson module
csvConv({
    noheader: false,
    trim: true,
    delimeter: ',',
    toArrayString: false
})
    .fromFile(csvFile)
    .on('end_parsed', function(jsonObjArray) {
        
        fs.appendFile(jsonFile, JSON.stringify(jsonObjArray,null,2), 'utf8', (err) =>{
            if (err){
                console.log('error writing file');
            }
        })
     })
     .on('error', (err) =>{
         console.log('error: ' + err);
     })
     .on('end', (error) => {
         console.log('completed')
     }
    )


// Create the JSON file to write the csv data.
function createFile(){
    fs.createWriteStream(jsonFile);
}