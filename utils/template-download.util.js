import axios from "axios";
import ora from "ora";
import fs from "fs";
import path from "path";

export async function DownloadTemplate(db_type, project_dir) {
    const templates = {
        SQL: "https://github.com/hariharanddeveloper/rest-sql-api/archive/refs/heads/main.zip",
        NoSQL: "https://github.com/hariharanddeveloper/rest-nosql-api/archive/refs/heads/main.zip",
    };

    const selected_template = templates[db_type];
    const template_path = path.join(project_dir, "template.zip");
    const spinner = ora("Downloading template...").start();

    try {
        const response = await axios({
            method: "get",
            url: selected_template,
            responseType: "stream",
        });

        const writer = fs.createWriteStream(template_path);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                spinner.succeed("Template downloaded successfully.");
                resolve(template_path);
            });

            writer.on("error", (error) => {
                spinner.fail("Failed to download template.");
                reject(error);
            });
        });
    } catch (error) {
        spinner.fail("Failed to download template.");
        throw error;
    }
}
