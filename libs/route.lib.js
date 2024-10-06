import fs from "fs";
import path from "path";
import { UpdateIndex } from "../utils/update-index.util.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export async function CreateRouteFile(filename, route_name) {
    const route_dir = path.join(process.cwd(), "routes");

    if (!fs.existsSync(route_dir)) {
        fs.mkdirSync(route_dir);
    }

    const route_path = path.join(route_dir, filename);

    if (fs.existsSync(route_path)) {
        ConsoleLog("ERROR", "Error", `: Route file '${filename}' already exists.`);
    }

    const pascal_case = route_name.charAt(0).toUpperCase() + route_name.slice(1);

    const route_template_content = `const express = require("express");
const router = express.Router();
const { ${pascal_case}Controller } = require("../controllers");

router.get("/", ${pascal_case}Controller.get${pascal_case}s);
router.get("/:id", ${pascal_case}Controller.get${pascal_case}ById);
router.post("/", ${pascal_case}Controller.create${pascal_case});
router.put("/:id", ${pascal_case}Controller.update${pascal_case});
router.delete("/:id", ${pascal_case}Controller.delete${pascal_case});

module.exports = router;
`;

    fs.writeFileSync(route_path, route_template_content, "utf-8");

    await UpdateIndex("route", route_dir, route_name);
}
