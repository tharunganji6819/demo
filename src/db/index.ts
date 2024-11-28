import mongoose from "mongoose";

const Db = () => {
  mongoose
    .connect(
      "mongodb+srv://tharun:tharun@tharun.qtg8wns.mongodb.net/demo?retryWrites=true&w=majority&appName=Tharun"
    )
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default Db;
