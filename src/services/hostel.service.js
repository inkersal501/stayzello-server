import Hostel from "../models/hostel.model.js";

export const createHostel = async (data) => {
  return await Hostel.create(data);
};

export const getAllHostels = async () => {
  return await Hostel.find().populate("ownerId");
};

export const getHostelById = async (id) => {
  return await Hostel.findById(id).populate("ownerId");
};

export const updateHostel = async (id, data) => {
  return await Hostel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteHostel = async (id) => {
  return await Hostel.findByIdAndDelete(id);
};
