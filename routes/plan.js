const {
    create,
    getAll,
    getOne
} = require('../controller/plan')


module.exports = (router) => {
    router.get('/plans', getAll);
    router.get('/plan', getOne);
    router.post('/plan', create);
}