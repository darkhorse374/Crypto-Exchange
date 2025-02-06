const SubscriberModel = require('../models/subscriber.model');

class SubscriberService {
    constructor() {

    }

    static async createSubscriber(rawData) {
        if (!this.emailValidation(rawData.email)) {
            return {response:false, message:"Email validation failed.", data:null}
        }
        let already = await SubscriberModel.findOne({email:rawData.email});
        if (already) {
            return {response:false, message:"Already registered.", data:null}
        }

        let result = await SubscriberModel.create(rawData);
        
        if (!result) {
            return {response:false, message:"An error caused during the creating a subscriber.", data:null}
        }

        return {response:true, message:"Success", data:null}
    }

    static async getAllSubscribers() {
        let subscriberList = await SubscriberModel.find();

        if (!subscriberList) {
            return {response:false, message:"There is no subscribers.", data: null}
        }

        return {response:true, message:"Success", data: subscriberList};
    }

    static emailValidation(enteredEmail){
        console.log(enteredEmail)
        var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(enteredEmail.match(mail_format))
        {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = SubscriberService;