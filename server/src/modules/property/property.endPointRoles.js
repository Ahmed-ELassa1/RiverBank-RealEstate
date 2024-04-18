import roles from "../../utils/roles.js";

const propertyEndPointsRoles = {
  addProperty: [roles.Admin],
  deleteProperty: [roles.Admin],
  updateProperty: [roles.Admin],
};

export default propertyEndPointsRoles;
