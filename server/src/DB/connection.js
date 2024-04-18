import mongoose from "mongoose"

const connection = async () => {
    await mongoose
        .connect(`${process.env.CONNECTION_URL}/${process.env.DATABASE_NAME}`)
        .then(() => {
            console.log(`DB connected`);
        }).catch((error) => {
            console.log(`failed to connect to DB`);
            console.log(error);
        })
}
export default connection