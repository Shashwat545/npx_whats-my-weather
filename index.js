#!/usr/bin/env node
'use strict'
const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const weather=require('weather-js');
clear();

const prompt = inquirer.createPromptModule();
const actions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `View the ${chalk.green.bold("weather")}?`,
                value: () => {
                    inquirer.prompt([
                    {
                        name: 'location',
                        message: `Which city are you in right now? ${chalk.grey.dim("(If you don't type any then it will select New York by default)")}`,
                        default: `New York`
                    },
                    ])
                    .then(answers => {
                        weather.find({search: answers.location, degreeType: 'C'}, function(err, result) {
                            if(err) console.log(err);
                            console.log('\nLocation: '+result[0].location.name+'\n');
                            console.log('Temperature: '+result[0].current.temperature+'°C\n');
                            console.log('Sky: '+result[0].current.skytext+'\n');
                            console.log('Humidity: '+result[0].current.humidity+'%\n');
                            console.log('Wind: '+result[0].current.winddisplay+'\n');
                        });
                    });
                }
            },
            {
                name: `View the ${chalk.redBright.bold("GitHub repo")}?`,
                value: () => {
                    open('https://github.com/Shashwat545/npx-open_weather');
                    console.log("\n A ⭐ on the repo would make my day :) \n");
                }
            },
            {
                name: "Just exit.",
                value: () => {
                    console.log("See you again soon!\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("                   Weather"),
    developer: `${chalk.hex("#2b82b2").bold("Shashwat Singh")}`,
    github: chalk.gray("https://github.com/") + chalk.green("Shashwat545/npx-open_weather"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("shashwatsingh545"),
    labeldeveloper: chalk.white.bold("  Developer:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
};

const box = boxen(
    [
        `${data.name}\n`,
        `${data.labeldeveloper}  ${data.developer}\n`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}\n`,
        `${chalk.italic(
            "This is an open source weather app,"
        )}`,
        `${chalk.italic("it works right inside your terminal without")}`,
        `${chalk.italic(
            "any hassle. If you found this interesting "
        )}`,
        `${chalk.italic(
            "then make sure to leave a star on the Github repo."
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "round",
        borderColor: "green",
    }
);

console.log(box);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);
prompt(actions).then(answer => answer.action());