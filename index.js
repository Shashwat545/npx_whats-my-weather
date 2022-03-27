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
const questions = [
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
                        message: `Which city are you in right now? (If you don't type any then it will select New York by default)`,
                        default: `New York`
                    },
                    ])
                    .then(answers => {
                        weather.find({search: answers.location, degreeType: 'C'}, function(err, result) {
                            if(err) console.log(err);
                            console.log(result[0].location.name);
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
                name: "Just quit.",
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

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labeldeveloper}  ${data.developer}`,
        ``,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        ``,
        `${chalk.italic(
            "This is an open source weather app,"
        )}`,
        `${chalk.italic("it works right inside your terminal without")}`,
        `${chalk.italic(
            "any installation. If you found this interesting "
        )}`,
        `${chalk.italic(
            "then make sure to leave a star on the Github repo."
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
