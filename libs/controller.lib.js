import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { UpdateIndex } from "../utils/update-index.util.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateControllerFile(file_name, controller_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");
    const controller_dir = path.join(process.cwd(), "Controllers");

    if (!fs.existsSync(controller_dir)) {
        fs.mkdirSync(controller_dir);
    }

    const controller_path = path.join(controller_dir, file_name);

    if (fs.existsSync(controller_path)) {
        ConsoleLog("ERROR", "Error", `: Controller file '${file_name}' already exists.`);
        process.exit(1);
    }

    (async () => {
        try {
            const fac_config_url = pathToFileURL(fac_folder_path);
            const fac_config = await import(fac_config_url.href);

            const pascal_case = controller_name.charAt(0).toUpperCase() + controller_name.slice(1);

            let controller_template_content = "";

            if (fac_config.default.Database.Type === "SQL") {
                controller_template_content = `const { ${pascal_case}Model } = require("../models");
const { SendResponse, StatusCodes } = require("../utils");

const get${pascal_case}s = async (req, res, next) => {
    try {
        const ${controller_name}s = await ${pascal_case}Model.findAll();

        SendResponse(res, StatusCodes.OK, ${controller_name}s, ["${pascal_case}s data received successfully."]);
    } catch (error) {
        next(error);
    }
};

const get${pascal_case}ById = async (req, res, next) => {
    try {
        const ${controller_name} = await ${pascal_case}Model.findByPk(req.params.id);

        if (${controller_name}) {
            SendResponse(res, StatusCodes.OK, ${controller_name}, ["${pascal_case} data received successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const create${pascal_case} = async (req, res, next) => {
    try {
        const { } = req.body;
        const new_${controller_name} = await ${pascal_case}Model.create({ });

        SendResponse(res, StatusCodes.CREATED, new_${controller_name}, ["${pascal_case} created successfully."]);
    } catch (error) {
        next(error);
    }
};

const update${pascal_case} = async (req, res, next) => {
    try {
        const { } = req.body;
        const ${controller_name} = await ${pascal_case}Model.findByPk(req.params.id);

        if (${controller_name}) {
            
            await ${controller_name}.save();
            SendResponse(res, StatusCodes.OK, ${controller_name}, ["${pascal_case} updated successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const delete${pascal_case} = async (req, res, next) => {
    try {
        const ${controller_name} = await ${pascal_case}Model.findByPk(req.params.id);

        if (${controller_name}) {
            await ${controller_name}.destroy();
            SendResponse(res, StatusCodes.OK, null, ["${pascal_case} deleted successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    get${pascal_case}s,
    get${pascal_case}ById,
    create${pascal_case},
    update${pascal_case},
    delete${pascal_case},
};
`;
            } else {
                controller_template_content = `const { ${pascal_case}Model } = require("../models");
const { SendResponse, StatusCodes } = require("../utils");

const get${pascal_case}s = async (req, res, next) => {
    try {
        const ${controller_name}s = await ${pascal_case}Model.find();

        SendResponse(res, StatusCodes.OK, ${controller_name}s, ["${pascal_case}s data received successfully."]);
    } catch (error) {
        next(error);
    }
};

const get${pascal_case}ById = async (req, res, next) => {
    try {
        const ${controller_name} = await ${pascal_case}Model.findById(req.params.id);

        if (${controller_name}) {
            SendResponse(res, StatusCodes.OK, ${controller_name}, ["${pascal_case} data received successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { } = req.body;
        const new_${controller_name} = new UserModel({ });

        await new_${controller_name}.save();
        SendResponse(res, StatusCodes.CREATED, new_${controller_name}, ["${pascal_case} created successfully."]);
    } catch (error) {
        next(error);
    }
};

const update${pascal_case} = async (req, res, next) => {
    try {
        const { } = req.body;
        const ${controller_name} = await ${pascal_case}Model.findById(req.params.id);

        if (${controller_name}) {

            await ${controller_name}.save();
            SendResponse(res, StatusCodes.OK, ${controller_name}, ["${pascal_case} updated successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const delete${pascal_case} = async (req, res, next) => {
    try {
        const ${controller_name} = await ${pascal_case}Model.findById(req.params.id);

        if (${controller_name}) {
            await ${controller_name}.deleteOne();
            SendResponse(res, StatusCodes.OK, null, ["${pascal_case} deleted successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["${pascal_case} not found."]);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    get${pascal_case}s,
    get${pascal_case}ById,
    create${pascal_case},
    update${pascal_case},
    delete${pascal_case},
};
`;
            }

            fs.writeFileSync(controller_path, controller_template_content, "utf-8");

            await UpdateIndex("controller", controller_dir, controller_name);
        } catch (error) {
            throw error;
        }
    })();
}
