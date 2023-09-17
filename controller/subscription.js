const Subscription = require('../models/subscription');
const User = require('../models/user');
const Plan = require('../models/plan');

let recurrence_list = 1 | 2 | 4;
let pickup_day_list = ['mon', 'tues', 'wed', 'thurs', 'fri'];

const day_index = (day) => {
    if(day == 'mon') {
        return 1;
    } else if(day == 'tues') {
        return 2;
    } else if(day == 'wed') {
        return 3;
    } else if(day == 'thurs') {
        return 4;
    } else if(day == 'fri') {
        return 5;
    } else {
        return 0;
    }
}

const add_days = (days, date) => {
    let d = new Date(date);
//    console.log(d);
    d.setDate(d.getDate() + days);
    let new_date = new Date(d);
    return new_date;
}

// let recurrence = 4;
//let pickup_day = 'mon';



// let result = {
//     pickup_dates,
//     start_date,
//     end_date
// }

// console.log(result);
const createOne = async (req, res) => {     
    const {user_id, plan_id, pickup_day} = req.body;
    if (!user_id || !plan_id) {
        return res.status(400).json({success: false, message: "User ID and Plan ID is required"})
    }
    const user = await User.findById(user_id).lean();
    if(!user) {
        return res.status(400).json({ success: false, message: "User ID is invalid" });
    }
    const plan = await Plan.findById(plan_id).lean();
    if(!plan) {
        return res.status(400).json({ success: false, message: "Plan ID is invalid" });
    }
    const subscriptionExist = await Subscription.findOne({ email: user.email, status: 'active' });
    if(subscriptionExist) {
        return res.status(400).json({ success: false, message: "You have an active subscription" });
    }

    const start_date = new Date(); 
    const end_date = add_days(30, start_date);

    let pickup_day_index = day_index(pickup_day);
    let today_index = start_date.getDay();

    let pickup_dates = [];
    let first_pickup_date, diff;

     console.log('today index', today_index);
     console.log('pickup_day_index', pickup_day_index);

    diff = pickup_day_index - today_index;

    //  console.log('first diff', diff);

    if(diff < 1) {
        diff += 7;
    } else {
        diff -= 1;
    }

    // if(today_index < pickup_day_index) {
    //     diff = pickup_day_index + today_index - 1;
    // } else {
    //      - 1;
    // }

    // console.log('diff', diff);

    first_pickup_date = add_days(diff, start_date);
    //console.log('first_pickup_date', first_pickup_date.toDateString());
    pickup_dates.push({
        date: first_pickup_date,
        readable_date: first_pickup_date.toDateString()
    })

    for(i = 1; i < plan.duration; i++) {
        let next_date = add_days(7, first_pickup_date)

        pickup_dates.push({
            date: next_date,
            readable_date: next_date.toDateString()
        })

        first_pickup_date = next_date;
    }

    const subscriber = {
        pickup_dates,
        start_date,
        end_date,
        name: user.name,
        email: user.email,
        user_id: user._id,
        plan_id: plan._id,
        package: plan.name
    };
    try{
        await Subscription.create(subscriber);
        return res.status(200).json({ success: true, message: "Your account has been created" });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const getAll = async (req, res) => {
    try{
        const subscription = await Subscription.find();
        return res.status(200).json({ success: true, message: "Users has been retrieved", data: subscription });
    }catch(err) {
        res.json(err)
    }
}


const updateOne = async (req, res) => {
    const { subscription_id } = req.body;
    if(!subscription_id) {
        return res.status(400).json({succes: false, message: "Subscription ID is required"})
    }
    try {
        await Subscription.findByIdAndUpdate(subscription_id, { status: "completed" });
        
         return res.status(200).json({success: true, message: "successful"})

        } catch (err) {
           return res.status(500).json({success: false})
        }
    }





module.exports = {
    createOne,
    getAll,
    updateOne
};