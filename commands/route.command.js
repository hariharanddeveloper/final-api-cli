import path from "path";
import fs from "fs";
import { CreateRouteFile } from "../libs/route.lib.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateRoute(route_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");

    if (!fs.existsSync(fac_folder_path)) {
        ConsoleLog("ERROR", "Error", ": The current working directory is not a final API CLI project.");
        process.exit(1);
    }

    if (typeof route_name !== "string" || !route_name.trim()) {
        ConsoleLog("ERROR", "Error", ": Please provide a valid name for the Route.");
        process.exit(1);
    }

    const route_file_name = `${route_name.trim()}.route.js`;

    try {
        CreateRouteFile(route_file_name, route_name.trim());

        ConsoleLog("SUCCESS", "CREATED", `: '${route_file_name}' created successfully.`);
        ConsoleLog("WARNING", "UPDATED", ": 'index.js' updated successfully.");
    } catch (error) {
        ConsoleLog("ERROR", "Error", `: Failed to create Route: ${error.message}`);
    }
}
