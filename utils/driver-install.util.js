export function GetDbInstallCommand(db_name) {
    const commands = {
        MySQL: "npm install mysql2",
        PostgreSQL: "npm install pg pg-hstore",
        SQLite: "npm install sqlite3",
        Oracle: "npm install oracledb",
        SQLServer: "npm install tedious",
        MariaDB: "npm install mariadb",
    };

    return commands[db_name] || null;
}
