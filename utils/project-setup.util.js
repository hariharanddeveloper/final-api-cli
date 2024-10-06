import fs from "fs";
import path from "path";
import ora from "ora";
import extract from "extract-zip";
import { ConsoleLog } from "./console-log.util.js";

export function SetupProjectDirectory(project_name) {
    const project_dir = path.join(process.cwd(), project_name);

    if (!fs.existsSync(project_dir)) {
        fs.mkdirSync(project_dir);
    } else {
        ConsoleLog("ERROR", "Error", ": Project directory already exists.");
        process.exit(1);
    }

    return project_dir;
}

export async function ExtractTemplate(template_path, project_dir) {
    const spinner = ora("Extracting template...").start();

    try {
        await extract(template_path, { dir: project_dir });
        fs.unlinkSync(template_path); // Remove the zip file after extraction
        spinner.succeed("Template extracted successfully.");
    } catch (err) {
        spinner.fail("Failed to extract template.");
        throw err;
    }
}

export function MoveExtractedFiles(project_dir, db_type) {
    const zip_file_name = db_type === "SQL" ? "rest-sql-api-main" : "rest-nosql-api-main";
    const extracted_dir = path.join(project_dir, zip_file_name);
    const files = fs.readdirSync(extracted_dir);

    files.forEach((file) => {
        const old_path = path.join(extracted_dir, file);
        const new_path = path.join(project_dir, file);
        fs.renameSync(old_path, new_path);
    });

    fs.rmdirSync(extracted_dir);
}

export function SaveProjectMetadata(project_dir, metadata) {
    const hidden_folder_path = path.join(project_dir, "configs");

    if (!fs.existsSync(hidden_folder_path)) {
        fs.mkdirSync(hidden_folder_path);
    }

    const metadata_path = path.join(hidden_folder_path, "fac.config.js");

    fs.writeFileSync(metadata_path, metadata, "utf8");
}
