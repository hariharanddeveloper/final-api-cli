import path from "path";
import fs from "fs";
import { CreateModelFile } from "../libs/model.lib.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateModel(model_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");

    if (!fs.existsSync(fac_folder_path)) {
        ConsoleLog("ERROR", "Error", ": The current working directory is not a final API CLI project.");
        process.exit(1);
    }

    if (typeof model_name !== "string" || !model_name.trim()) {
        ConsoleLog("ERROR", "Error", ": Please provide a valid name for the Model.");
        process.exit(1);
    }

    const model_file_name = `${model_name.trim()}.model.js`;

    try {
        CreateModelFile(model_file_name, model_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${model_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        ConsoleLog("ERROR", "Error", `: Failed to create Model: ${error.message}`);
    }
}
