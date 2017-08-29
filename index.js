#! /usr/bin/env node

'use strict';
const program = require("commander");

//http client library
const request = require("request");
const currentVersion = '1.0.0';

// return the help menu if no argument was inputed
if (process.argv.length === 2) {
    program.help();
}
if (process.argv.length > 3) {
    console.log('You can only search for one state.')
    return;
}
const apiUrl = 'https://nigerian-states-info.herokuapp.com/api/states/'
let getState = request(apiUrl + process.argv[2].toLowerCase(), (error, response, data) => {
    if (error) {
        console.log("There is an error");
        console.log(error);
    }
    else {
        let json = JSON.parse(data);
        console.log(json.info);
        if (json.info !== "state not found") {
            console.log("State Name: " + json.data.info.officialName);
            console.log("Capital: " + json.data.info.Capital);
            console.log("Governor: " + json.data.info.Governor);
            console.log("Deputy Governor: " + json.data.info.DeputyGovernor);
            console.log("Population: " + json.data.info.Population + " people");
            console.log("Slogan: " + json.data.info.Slogan);
            console.log("Number of Local Government Areas: " + json.data.info.Number_of_LGAS);
            console.log("Official Website: " + json.data.info.Website);
        }
        else {
            console.log("You inputed a wrong state name, please try again");
        }
    }
});


program
    .version(currentVersion)
    .command('stateinfo [state]')
    .description('get state information')
    .action(getState);

program
    .version(currentVersion)
    .option('-v, --version', 'get version')



program.parse(process.argv);