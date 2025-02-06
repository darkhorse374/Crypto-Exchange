const P2PService = require("../services/p2p.service");

class P2PController {
    createP2P = async (req, res, next) => {
        try {
            const result = await P2PService.createP2P(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    updateP2P = async (req, res, next) => {
        try {
            const result = await P2PService.updateP2P(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllP2P = async (req, res, next) => {
        try {
            const result = await P2PService.getAllP2P(req.query);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneP2P = async (req, res, next) => {
        try {
            const result = await P2PService.getOneP2P(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteP2P = async (req, res, next) => {
        try {
            const result = await P2PService.deleteP2P(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    uploadImage = async (req, res, next) => {
        try {
            const result = await P2PService.uploadImage(req);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new P2PController