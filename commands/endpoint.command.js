import path from "path";
import fs from "fs";
import { CreateRouteFile } from "../libs/route.lib.js";
import { CreateControllerFile } from "../libs/controller.lib.js";
import { CreateModelFile } from "../libs/model.lib.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateEndpoint(endpoint_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");

    if (!fs.existsSync(fac_folder_path)) {
        ConsoleLog("ERROR", "Error", ": The current working directory is not a final API CLI project.");
        process.exit(1);
    }

    if (typeof endpoint_name !== "string" || !endpoint_name.trim()) {
        ConsoleLog("ERROR", "Error", ": Please provide a valid name for the Endpoint.");
        process.exit(1);
    }

    const route_file_name = `${endpoint_name.trim()}.route.js`;

    try {
        CreateRouteFile(route_file_name, endpoint_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${route_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        ConsoleLog("ERROR", "Error", `: Failed to create Route: ${error.message}`);
    }

    const model_file_name = `${endpoint_name.trim()}.model.js`;

    try {
        CreateModelFile(model_file_name, endpoint_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${model_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        console.error(`Failed to create Model: ${error.message}`);
    }

    const controller_file_name = `${endpoint_name.trim()}.controller.js`;

    try {
        CreateControllerFile(controller_file_name, endpoint_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${controller_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        console.error(`Failed to create Controller: ${error.message}`);
    }
}
