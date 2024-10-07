#!/usr/bin/env node

import { program } from "commander";
import { InitProject } from "../commands/init.command.js";
import { CreateRoute } from "../commands/route.command.js";
import { CreateController } from "../commands/controller.command.js";
import { CreateModel } from "../commands/model.command.js";
import { CreateEndpoint } from "../commands/endpoint.command.js";

program.description("Final API CLI for creating a Node.js REST API");

program.version("1.0.2", "-v, --version", "output the version number");

program.option("-i, --init [project-name]", "initialize a new project", InitProject);

program.option("-r, --route [route-name]", "create a new route", CreateRoute);

program.option("-c, --controller [controller-name]", "create a new controller", CreateController);

program.option("-m, --model [model-name]", "create a new model", CreateModel);

program.option("-e, --endpoint [endpoint-name]", "create a new endpoint", CreateEndpoint);

program.helpOption("-h, --help", "display help for command");

program.parse(process.argv);
