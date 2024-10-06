import fs from "fs";
import path from "path";
import { ConsoleLog } from "./console-log.util.js";

export async function UpdateIndex(cmd_type, dir_path, value) {
    const pascal_case = value.charAt(0).toUpperCase() + value.slice(1);
    const index_file_path = path.join(dir_path, "index.js");

    const type_statements = {
        route: {
            import: `const ${pascal_case}Routes = require("./${value}.route");`,
            export: `${pascal_case}Routes`,
        },
        model: {
            import: `const ${pascal_case}Model = require("./${value}.model");`,
            export: `${pascal_case}Model`,
        },
        controller: {
            import: `const ${pascal_case}Controller = require("./${value}.controller");`,
            export: `${pascal_case}Controller`,
        },
    };

    const { import: import_statement, export: export_statement } = type_statements[cmd_type];

    if (!fs.existsSync(index_file_path)) {
        const initial_content = `${import_statement}\n\nmodule.exports = {\n    ${export_statement},\n};`;

        try {
            fs.writeFileSync(index_file_path, initial_content, "utf8");
        } catch (err) {
            ConsoleLog("ERROR", "Error", `: ${err}`);
            process.exit(1);
        }
        return true;
    }

    try {
        const data = fs.readFileSync(index_file_path, "utf8");

        if (data.length === 0) {
            const initial_content = `${import_statement}\n\nmodule.exports = {\n    ${export_statement},\n};`;
            fs.writeFileSync(index_file_path, initial_content, "utf8");
            return true;
        }

        if (data.includes(import_statement)) {
            return true;
        }

        const lines = data.split("\n");
        let import_added = false;
        let export_added = false;
        let remove_line_index = null;

        const updated_lines = lines.map((line, index) => {
            const trimmed_line = line.trim();

            if (!import_added && trimmed_line.startsWith("module.exports = {")) {
                import_added = true;
                remove_line_index = index - 1;

                return `${import_statement}\n\n${line}`;
            }

            if (!export_added && trimmed_line === "};") {
                export_added = true;

                if (!lines[index - 1].trim().endsWith(",")) {
                    lines[index - 1] += ",";
                }

                return `    ${export_statement},\n${line}`;
            }

            return line;
        });

        if (!import_added) {
            updated_lines.unshift(import_statement);
        }

        if (!export_added) {
            const last_line_index = updated_lines.length - 1;
            updated_lines[last_line_index - 1] += ",";
            updated_lines.splice(last_line_index, 0, `    ${export_statement}`);
        }

        if (remove_line_index !== null) {
            updated_lines.splice(remove_line_index, 1);
        }

        fs.writeFileSync(index_file_path, updated_lines.join("\n"), "utf8");
        return true;
    } catch (err) {
        ConsoleLog("ERROR", "Error", `: ${err}`);
        process.exit(1);
    }
}
