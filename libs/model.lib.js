import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { UpdateIndex } from "../utils/update-index.util.js";
import { ConsoleLog } from "../utils/console-log.util.js";

export function CreateModelFile(file_name, model_name) {
    const fac_folder_path = path.join(process.cwd(), "configs", "fac.config.js");
    const model_dir = path.join(process.cwd(), "Models");

    if (!fs.existsSync(model_dir)) {
        fs.mkdirSync(model_dir);
    }

    const model_path = path.join(model_dir, file_name);

    if (fs.existsSync(model_path)) {
        ConsoleLog("ERROR", "Error", `: Model file '${file_name}' already exists.`);
    }

    (async () => {
        try {
            const fac_config_url = pathToFileURL(fac_folder_path);
            const fac_config = await import(fac_config_url.href);

            const pascal_case = model_name.charAt(0).toUpperCase() + model_name.slice(1);

            let model_template_content = "";

            if (fac_config.default.Database.Type === "SQL") {
                model_template_content = `const { DataTypes } = require("sequelize");
const { Sequelize } = require("../configs");

const ${pascal_case}Model = Sequelize.define(
    "${pascal_case}",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "id is required.",
                },
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "createdAt is required.",
                },
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "updatedAt is required.",
                },
            },
        },
    },
    {
        timestamps: true,
        tableName: "${pascal_case}s",
    }
);

module.exports = ${pascal_case}Model;
`;
            } else {
                model_template_content = `const mongoose = require("mongoose");
const { Schema } = mongoose;

const ${model_name}Schema = new Schema(
    {
        createdAt: {
            type: Date,
            required: [true, "createdAt is required."],
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            required: [true, "updatedAt is required."],
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: "${pascal_case}s",
    }
);

const ${pascal_case}Model = mongoose.model("${pascal_case}", ${model_name}Schema);

module.exports = ${pascal_case}Model;
`;
            }

            fs.writeFileSync(model_path, model_template_content, "utf-8");

            await UpdateIndex("model", model_dir, model_name);
        } catch (error) {
            throw error;
        }
    })();
}
