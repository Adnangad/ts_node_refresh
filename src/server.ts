import { app } from "./app";
import { env } from "./config/env";
import { sequelize } from "./config/database";
import { initModels } from "./models";

async function connectWithRetries(retries: number, delay: number): Promise<void> {
    while (retries > 0) {
        let count = 0;
        try {
            await sequelize.authenticate();
            console.log("Connected to the db successfully:: ", count);
            break;
        }
        catch(err) {
            retries -= 1
            count += 1
            if (retries < 1) {
                throw err;
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

async function startServer() {
    try {
        await connectWithRetries(4, 4000);

        initModels(sequelize);
        if (env.NODE_ENV === "development") {
            await sequelize.sync({ alter: true });
        }

        app.listen(env.PORT, () => {
            console.log(`Server is listening at:: http://localhost:${env.PORT}`);
        });
    }catch(error) {
        console.error("FAILED:: ", error);
    }
}
startServer();