import inquirer from "inquirer";
import { DownloadTemplate } from "../utils/template-download.util.js";
import { InstallPackages } from "../utils/package-installer.util.js";
import {
    SetupProjectDirectory,
    ExtractTemplate,
    MoveExtractedFiles,
    SaveProjectMetadata,
} from "../utils/project-setup.util.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export async function InitProject(project_name) {
    if (typeof project_name !== "string" || !project_name.trim()) {
        ConsoleLog("ERROR", "Error", ": Please provide a valid name for the API.");
        process.exit(1);
    }

    const project_dir = SetupProjectDirectory(project_name);

    const { db_type } = await inquirer.prompt([
        {
            type: "list",
            name: "db_type",
            message: "Choose your database type:",
            choices: ["SQL", "NoSQL"],
        },
    ]);

    if (db_type === "SQL") {
        var { db_dialect } = await inquirer.prompt([
            {
                type: "list",
                name: "db_dialect",
                message: "Choose your database:",
                choices: ["MySQL", "PostgreSQL", "SQLite", "Oracle", "SQL Server", "MariaDB"],
            },
        ]);
    }
    const template_path = await DownloadTemplate(db_type, project_dir);

    await ExtractTemplate(template_path, project_dir);
    await MoveExtractedFiles(project_dir, db_type);
    await InstallPackages(db_dialect, db_type, project_dir);

    if (db_type === "SQL") {
        const fac_config = `module.exports = {
    ProjectName: "${project_name}",
    Database: { Type: "SQL", Dialect: "${db_dialect}" },
};
`;
        SaveProjectMetadata(project_dir, fac_config);
    } else {
        const fac_config = `module.exports = {
    ProjectName: "${project_name}",
    Database: { Type: "NoSQL" },
};
`;
        SaveProjectMetadata(project_dir, fac_config);
    }

    ConsoleLog("SUCCESS", "Project setup complete!", "");
}
