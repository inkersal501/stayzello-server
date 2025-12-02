import {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel
} from "../services/hostel.service.js";

// Create hostel
export const createHostelController = async (req, res) => {
  try {
    const hostel = await createHostel({...req.body, ownerId: req.user.id});
    res.status(201).json({ success: true, data: hostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all hostels
export const getAllHostelsController = async (req, res) => {
  try {
    const hostels = await getAllHostels(req.user.id);
    res.status(200).json({ success: true, data: hostels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get hostel by ID
export const getHostelByIdController = async (req, res) => {
  try {
    const hostel = await getHostelById(req.params.id);

    if (!hostel) {
      return res.status(404).json({ success: false, message: "Hostel not found" });
    }

    res.status(200).json({ success: true, data: hostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update hostel
export const updateHostelController = async (req, res) => {
  try {
    const updatedHostel = await updateHostel(req.params.id, req.body);

    if (!updatedHostel) {
      return res.status(404).json({ success: false, message: "Hostel not found" });
    }

    res.status(200).json({ success: true, data: updatedHostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete hostel
export const deleteHostelController = async (req, res) => {
  try {
    const deleted = await deleteHostel(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Hostel not found" });
    }

    res.status(200).json({ success: true, message: "Hostel deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
