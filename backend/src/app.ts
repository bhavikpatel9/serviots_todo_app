import express, { Application } from "express"
import { envConfig } from "./config/env.config";
import cors from 'cors';
import AuthRoutes from "./routes/auth.routes";
import TaskRoutes from "./routes/task.routes";
import { connectDB } from "./config/db.config";

export default class App {
    public app: Application;
    public port: number;

    constructor(routes: Array<AuthRoutes | TaskRoutes>) {
        this.app = express();
        this.port = envConfig.PORT;
        this.initializeMiddleware();
        this.setUpRouters(routes);
        this.startServer();
    }

    async connectToDB() {
        await connectDB();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private setUpRouters(routes: Array<AuthRoutes | TaskRoutes>) {
        routes.forEach(route => {
            this.app.use('/api', route.router)
        });
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
