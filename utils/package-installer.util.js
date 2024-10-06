import ora from "ora";
import { exec } from "child_process";
import { GetDbInstallCommand } from "../utils/driver-install.util.js";
import { ConsoleLog } from "./console-log.util.js";

export function InstallPackages(db_name, db_type, project_dir) {
    const spinner = ora("Installing npm packages...").start();

    return new Promise((resolve, reject) => {
        exec("npm install", { cwd: project_dir }, (error, stdout, stderr) => {
            if (error) {
                spinner.fail("Failed to install npm packages.");
                ConsoleLog("ERROR", "Error", `: ${stderr}`);

                return reject(error);
            }

            if (db_type === "SQL") {
                const db_install_cmd = GetDbInstallCommand(db_name);

                if (!db_install_cmd) {
                    spinner.fail("Unsupported database type.");

                    return reject(new Error("Unsupported database type"));
                }

                exec(db_install_cmd, { cwd: project_dir }, (dbError, dbStdout, dbStderr) => {
                    if (dbError) {
                        spinner.fail("Failed to install database packages.");
                        ConsoleLog("ERROR", "Error", `: ${dbStderr}`);

                        return reject(dbError);
                    }

                    spinner.succeed("Npm packages installed successfully.");
                    resolve(dbStdout);
                });
            } else {
                spinner.succeed("Npm packages installed successfully.");
                resolve(stdout);
            }
        });
    });
}
