const express = require('express');
const router=express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
router.get('/',shopController.getIndex);
router.get('/getlocation',shopController.getlocation);
router.get('/getstorelist',isAuth,shopController.getstorelist);
router.post('/items',isAuth,shopController.getstoreitems);
router.get('/addcart/:Name',isAuth,shopController.addcart);
router.get('/removecart/:Name',isAuth,shopController.removecart)
router.get('/:category/:Id',isAuth,shopController.getdairyitems);
router.post('/postsearch/:SPIN',isAuth,shopController.getproduct);
router.post('/postcart',isAuth,shopController.postcart);
router.get('/getcart',isAuth,shopController.getcart);

module.exports=router;