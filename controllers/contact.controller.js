const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../Utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name is required"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    console.log(document);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "cannot create contact"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const contactService = new ContactService(MongoDB.client);

    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "cannot get contact"));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    console.log(document);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "cannot get contact"));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was update successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was delete successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error delete contact with id=${req.params.id}`)
    );
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while retrieving favorite contacts")
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleteCount = await contactService.deleteAll();
    return res.send({message: `${deleteCount} contacts were deleted successfully`});
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while removing all contacts")
    );
  }
};
