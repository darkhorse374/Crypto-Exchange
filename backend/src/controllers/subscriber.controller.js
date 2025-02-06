const SubscriberService = require("../services/subscriber.service")

class SubscriberController {
    createSubscriber = async (req, res, next) => {
        try {
            const result = await SubscriberService.createSubscriber(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllSubscribers = async (req, res, next) => {
        try {
            const result = await SubscriberService.getAllSubscribers();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SubscriberController