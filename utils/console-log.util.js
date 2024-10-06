// ANSI escape codes for colors
const colors = {
    green: "\x1b[32m", // Green
    yellow: "\x1b[33m", // Yellow
    red: "\x1b[31m", // Red
    blue: "\x1b[34m", // Blue
    reset: "\x1b[0m", // Reset to default
};

export function ConsoleLog(message_type, message_title, message) {
    switch (message_type) {
        case "SUCCESS":
            console.log(`${colors.green}${message_title} ${message}${colors.reset}`);
            break;

        case "WARNING":
            console.log(`${colors.yellow}${message_title} ${message}${colors.reset}`);
            break;

        case "ERROR":
            console.log(`${colors.red}${message_title} ${message}${colors.reset}`);
            break;

        case "INFO":
            console.log(`${colors.blue}${message_title} ${message}${colors.reset}`);
            break;

        default:
            console.log(message);
            break;
    }
}
