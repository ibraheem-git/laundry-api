const {
    createOne, getAll, updateOne
} = require('../controller/subscription')


module.exports = (router) => {
    router.get('/subs', getAll);
    router.post('/sub',createOne);
    router.put('/beta',  updateOne);
}