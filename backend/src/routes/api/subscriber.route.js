/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const SubscriberController = require("../../controllers/subscriber.controller")

router.post('/create', awaitHandlerFactory(SubscriberController.createSubscriber))
router.get('/', awaitHandlerFactory(SubscriberController.getAllSubscribers))

module.exports = router