const createService = async (req, res) => {
  try {
    const { customerId, ...serviceData } = req.body;
    
    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Create service with reference to customer
    const service = await Service.create({
      ...serviceData,
      customer: customerId
    });

    // Update customer profile with service reference
    await CustomerProfile.findByIdAndUpdate(
      customerId,
      { $push: { services: service._id } }
    );

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 