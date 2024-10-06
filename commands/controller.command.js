import path from "path";
import fs from "fs";
import { CreateControllerFile } from "../libs/controller.lib.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateController(controller_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");

    if (!fs.existsSync(fac_folder_path)) {
        ConsoleLog("ERROR", "Error", ": The current working directory is not a final API CLI project.");
        process.exit(1);
    }

    if (typeof controller_name !== "string" || !controller_name.trim()) {
        ConsoleLog("ERROR", "Error", ": Please provide a valid name for the Controller.");
        process.exit(1);
    }

    const controller_file_name = `${controller_name.trim()}.controller.js`;

    try {
        CreateControllerFile(controller_file_name, controller_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${controller_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        ConsoleLog("ERROR", "Error", `: Failed to create Controller: ${error.message}`);
    }
}
