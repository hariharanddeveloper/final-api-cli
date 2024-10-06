<div align="center">
  <img src="./assets/logo.png" alt="Final API CLI Logo" width="80%"/>
</div>

---

<p align="center">
  <br />
  The <b>"final-api-cli"</b> is a powerful command-line interface tool designed to simplify and accelerate the development of Node.js REST APIs. With this CLI, you can automatically generate a fully structured, best-practices-compliant REST API based on user inputs. The generated API comes pre-configured with essential features such as routes, controllers, models, and Docker support, making it ideal for both small-scale and enterprise-level applications.
  <br />
  <br />
  <a href="https://hariharanddeveloper.github.io/final-api-cli-website/"><strong>Explore the Documentation »</strong></a>
  <br />
  <br />
  <a href="https://github.com/hariharanddeveloper/final-api-cli">View Source</a>
  .
  <a href="https://hariharanddeveloper.github.io/final-api-cli-website/">Website</a>
  ·
  <a href="https://github.com/hariharanddeveloper/final-api-cli/issues">Report Bug</a>
  ·
  <a href="https://github.com/hariharanddeveloper/final-api-cli/issues">Request Feature</a>

</p>

---

<br/>

![npm](https://img.shields.io/npm/v/final-api-cli)
![license](https://img.shields.io/github/license/hariharanddeveloper/final-api-cli)
![issues](https://img.shields.io/github/issues/hariharanddeveloper/final-api-cli)
![GitHub stars](https://img.shields.io/github/stars/hariharanddeveloper/final-api-cli?style=social)

---

## ✨ Key Features

-   **Automatic Code Generation**: Instantly create a fully functional REST API with modular architecture.

-   **Supports Multiple Databases**: Compatible with SQL and NoSQL databases. likes MySQL, PostgreSQL, MongoDB, and more.

-   **Comprehensive Testing**: Pre-configured with testing frameworks to ensure code quality.

-   **Docker Integration**: Out-of-the-box Docker support for easy containerization and deployment.

-   **Optimized Codebase**: Follows industry standards and best practices for maintainable and scalable code.

-   **Environment Configuration**: .env files for environment-specific settings.

## 📦 Installation

Install `final-api-cli` globally using npm:

```bash
npm install -g final-api-cli
```

## 🛠️ Commands

`final-api-cli` offers a variety of commands to help you quickly scaffold and manage your API projects:

### help

Displays a list of available commands and their descriptions.

```bash
fac -h | fac --help
```

### version

Displays the current version of the CLI.

```bash
fac -v | fac --version
```

### init

Creates a new API project.

```bash
fac -i [route-name] | fac --init [route-name]
```

### route

Creates a new API route.

```bash
fac -r [route-name] | fac --route [route-name]
```

### model

Generates a new model.

```bash
fac -m [model-name] | fac --model [model-name]
```

### controller

Creates a new controller.

```bash
fac -c [controller-name] | fac --controller [controller-name]
```

### endpoint

Generates a new API endpoint with route, model, and controller.

```bash
fac -e [endpoint-name] | fac --endpoint [endpoint-name]
```

## 🌐 API Information

The REST API generated by Final API CLI is designed to be robust, scalable, and easy to maintain. It follows best practices for RESTful architecture, provides extensive support for Docker containerization, environment variable configuration, process management, and comprehensive testing, including unit, integration, and end-to-end tests. Below is a breakdown of some key endpoints provided by the generated API:

### Health Check

-   GET `/api/health` - Check the health status of the API.

### File Operations

-   POST `/api/upload` - Upload a file to the server.
-   GET `/api/download/:file-name` - Download a file from the server.

### User Management

-   GET `/api/users` - Retrieve a list of all users.
-   GET `/api/users/:id` - Retrieve details of a specific user.
-   POST `/api/users` - Create a new user.
-   PUT `/api/users/:id` - Update an existing user's information.
-   DELETE `/api/users/:id` - Remove a user from the system.

## 📚 Documentation

Comprehensive documentation is available for all commands and configurations. You can also refer to the official [documentation](https://hariharanddeveloper.github.io/final-api-cli-website/) for more detailed information.

## 📝 Repository

Check out the source code on [GitHub](https://github.com/hariharanddeveloper/final-api-cli).

## 🙌 Contributing

Contributions are welcome! Feel free to fork this project, submit issues, and create pull requests. Please refer to the [CONTRIBUTING](CONTRIBUTING.md) file for more details on our contribution guidelines.

## 📝 License

Distributed under the [MIT License](LICENSE) See LICENSE for more information.

## 💬 Feedback and Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/hariharanddeveloper/final-api-cli/issues). Your feedback is valuable and helps us improve the tool.

<p align="center"> Made with ❤️ by Hariharan Duraisamy </p>
