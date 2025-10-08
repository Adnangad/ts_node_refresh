import { app } from "./app";
import { env } from "./config/env";
import { sequelize } from "./config/database";
import { initModels } from "./models";

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Connected to the db successfully");

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