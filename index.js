#! /usr/bin/env node

'use strict';
const program  = require("commander");

//http client library
const request  = require("request");

// return the help menu if no argument was inputed
if(process.argv.length === 2){
    program.help();
}

/*
 this function uses the request package to get info from the url
 process.argv[2] is the input from the command line

*/

let getState = request('https://nigerian-states-info.herokuapp.com/api/states/'+ process.argv[2].toLowerCase() , function (error, response, data) {
    // parse the JSON data received
    let json = JSON.parse(data);
    //log a success message
    console.log(json.info);

    if(json.info != "state not found"){
        console.log("State Name: " + json.data.info.officialName);
        console.log("Capital: " + json.data.info.Capital);
        console.log("Governor: " + json.data.info.Governor);
        console.log("Deputy Governor: " + json.data.info.DeputyGovernor);
        console.log("Population: " + json.data.info.Population + " people");
        console.log("Slogan: " + json.data.info.Slogan);
        console.log("Number of Local Government Areas: " + json.data.info.Number_of_LGAS);
        console.log("Official Website: " + json.data.info.Website);
    }
    // if state is not found log a message to the user
    else{
        console.log("You inputed a wrong state name, please try again");
    }
});


program
    .version('1.0.0')
    .command('stateinfo [state]')
    .description('get state information')
    .action(getState);

program.parse(process.argv);