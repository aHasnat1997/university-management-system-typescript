import mongoose from "mongoose";
import app from "./app"
import config from "./config";

(async function server() {
    try {
        // server listening
        app.listen(config.port, () => {
            console.log(`server 🔥 on port: ${config.port}`)
        });

        // DB connection
        await mongoose
            .connect(config.databaseURL as string, {
                autoIndex: true,
            })
            .then(() => console.log('Connected to DB 🔌'))
            .catch((error) => console.log(error.message))
    } catch (error) {
        console.log(error);
    }
})();