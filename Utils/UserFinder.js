import User from "../models/User_Model.js";
import { NotFoundError } from "../Utils/errors.js";

const userFinder = async ({
  key,
  query,
  includePassword = false,
  includePopulate = false,
  lean = false,
  select = null,
}) => {
  try {
    if (!key || !query)
      throw new NotFoundError("Key or query missing in userFinder");

    let selectFields = select || (includePassword ? "+password" : "-password");

    let userQuery = User.findOne({ [key]: query }).select(selectFields);

    if (includePopulate) {
      userQuery = userQuery.populate({
        path: "result",
        model: "Result",
      });
    }

    if (lean) {
      userQuery = userQuery.lean();
    }

    const user = await userQuery;
    return user || null;
  } catch (err) {
    console.error("userFinder error:", err.message);
    throw new NotFoundError("User not found or error in query");
  }
};
export default userFinder;
