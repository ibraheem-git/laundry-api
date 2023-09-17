const Plan = require('../models/plan');

const getAll = async (req ,res) => {
    try{
        const plans = await Plan.find();
        return res.status(200).json({ success: true, message: "Plans has been retrieved", data: plans });
    }catch(err) {
        res.json(err)
    }
};


const getOne = async (req ,res) => {
    try{
        const { id } = req.query;
        if(!id) {
            return res.status(400).json({ success: false, message: "Plan id is required" });
        }
        const plan = await Plan.findById(id);
        return res.status(200).json({ success: true, message: "Plan has been retrieved", data: plan });
    }catch(err) {
        res.json(err)
    }
};

const create = async(req, res) => {
    const { name, amount, duration } = req.body;
    if(!name || !amount || !duration) {
        return res.status(400).json({ success: false, message: "Email and password is required" });
    }
    const planExist = await Plan.findOne({ name });
    if(planExist) {
        return res.status(400).json({ success: false, message: "Plan already exist" });
    }
    const plan = {name, amount, duration};
    try{
        await Plan.create(plan);
        return res.status(200).json({ success: true, message: "New plan has been created" });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = {
    create,
    getAll,
    getOne
}