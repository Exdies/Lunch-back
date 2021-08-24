import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://usertest:newpassword123@cluster0.8pn1u.mongodb.net/launch-app-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected to: ", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
/* async function connect() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://usertest:newpassword123@cluster0.8pn1u.mongodb.net/launch-app-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected to: ", db.connection.name);
  } catch (error) {
    console.log(error);
  }
}

export default connect; */
