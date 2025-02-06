const IEOService = require("../services/ieo.service");

class IEOController {
    createIEO = async (req, res, next) => {
        try {
            const result = await IEOService.createIEO(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    updateIEO = async (req, res, next) => {
        try {
            const result = await IEOService.updateIEO(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllIEO = async (req, res, next) => {
        try {
            const result = await IEOService.getAllIEO();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneIEO = async (req, res, next) => {
        try {
            const result = await IEOService.getOneIEO(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteIEO = async (req, res, next) => {
        try {
            const result = await IEOService.deleteIEO(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new IEOController