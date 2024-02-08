#!/usr/bin/env node
'use strict';

import chalk from "chalk";
import wrap from "word-wrap";
import { select } from "@inquirer/prompts";
import open from "open";
import terminalImage from "terminal-image";
import axios from "axios";

console.log("\n");

const options = [
  {
    name: chalk.hex("1c96e8")(`🐦 What do I think? (${chalk.bold("Twitter")})`),
    value: "https://twitter.com/onurravli",
  },
  {
    name: chalk.reset(`💻 What do I do? (${chalk.bold("GitHub")})`),
    value: "https://github.com/onurravli",
  },
  {
    name: chalk.red(`📃 What is my background? (${chalk.bold("My resume")})`),
    value: "https://onurravli.com/Onur_Ravli_Resume.pdf",
  },
  {
    name: chalk.hex("1ed760")(`🎧 What do I listen to? (${chalk.bold("Spotify")})`),
    value: "https://open.spotify.com/user/onurravli",
  },
  {
    name: chalk.hex("#830cf3")(`📸 What do I look like? (${chalk.bold("Instagram")})`),
    value: "https://instagram.com/onurravli",
  },
  {
    name: chalk.green(`👋 No, thanks.`),
    value: "exit",
  },
];

axios
  .get("https://avatars.githubusercontent.com/u/47084109?v=4", {
    responseType: "arraybuffer",
  })
  .then((response) => {
    // Display the image in the terminal using terminal-image
    return terminalImage.buffer(response.data, { width: "20%", preserveAspectRatio: true });
  })
  .then((image) => {
    console.log(
      wrap(image, {
        width: 60,
      })
    );
    console.log("\n");
  })
  .then(() => {
    console.log(
      wrap(`Hello, I am ${chalk.bold.green("Onur Ravli")}!`, {
        width: 60,
      })
    );

    console.log("\n");

    console.log(
      wrap(
        `I'm a 22-year-old ${chalk.red(
          "full-stack developer"
        )} living in Turkey, currently in the 3rd year of computer engineering at ${chalk.green(
          "Konya Technical University"
        )}.`.trim(),
        { width: 80 }
      )
    );

    console.log("\n");

    select({
      message: "What do you want to visit?",
      choices: options,
    }).then((selection) => {
      if (selection == "exit") {
        console.log("👋 Bye!");
        process.exit(0);
      } else {
        console.log(chalk.underline(`🌍 Opening ${selection}`));
        open(selection);
      }
    });
  });

process.on('exit', () => {
  console.log("\n");
  console.log("Bye.");
  process.exit(0);
})