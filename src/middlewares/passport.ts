import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/User";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    //console.log(user?._id);
    if (user) {
      return done(null, user?._id);
    } else {
      console.log("token invalido");
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
  }
});
