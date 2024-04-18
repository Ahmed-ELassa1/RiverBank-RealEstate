import clientRequestModel from "../../../DB/models/clientRequest.model.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const addClientRequest = async (req, res, next) => {
  const newRequest = await clientRequestModel.create(req.body);
  if (newRequest) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newRequest.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const getAllClientRequest = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-createdAt`;
  const apiFeature = new ApiFeatures(
    clientRequestModel.find({ isDeleted: false }),
    req.query
  )
    .fields()
    .sort()
    .search()
    .filter()
    .paginate();
  const requests = await apiFeature.mongooseQuery;
  if (requests) {
    return res.status(200).json({ message: "done", data: requests });
  }
};
export const getClientRequestById = async (req, res, next) => {
  const clientRequest = await clientRequestModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted,-updatedAt,-__v,-createdBy,-createdAt");
  if (!clientRequest) {
    return next(new Error("Client Request not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: clientRequest });
};
export const updateClientRequest = async (req, res, next) => {
  const clientRequest = await clientRequestModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted,-updatedAt,-__v,-createdBy,-createdAt");

  if (!clientRequest) {
    return next(new Error("Client Request not found", { cause: 404 }));
  }
  const clientRequestUpdated = await clientRequestModel.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    req.body,
    { new: true }
  );
  if (clientRequestUpdated) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...clientRequestUpdated.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(200).json({ message: "done", data: clonedResponse });
  }
};
export const deleteClientRequest = async (req, res, next) => {
  const clientRequestExist = await clientRequestModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!clientRequestExist) {
    return next(new Error("Client Request not found", { cause: 404 }));
  }
  const DeletedClientRequest = await clientRequestModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { isDeleted: true },
    { new: true }
  );
  return res.status(200).json(true);
};
