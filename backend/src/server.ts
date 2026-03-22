import App from "./app";
import AuthRoutes from "./routes/auth.routes";
import TaskRoutes from "./routes/task.routes";

(async () => {
    const app = new App([
        new AuthRoutes(),
        new TaskRoutes(),
    ]);
    await app.connectToDB();
})()


