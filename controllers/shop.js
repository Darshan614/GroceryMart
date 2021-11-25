const Store = require("../models/stores");
const Item = require("../models/items");
exports.getIndex = (req, res, next) => {
  res.render("shop/shop");
};

exports.getlocation = (req, res, next) => {
  res.render("shop/location");
};

//{location:{$near:{$geometry:{type:"Point",coordinates:[lt,lg]},$maxDistance:1000}}}

exports.getstorelist = (req, res, next) => {
  console.log("inside storelist");
  console.log(req.user, "here is the user");
  let lt = req.user.address.latitude;
  let lg = req.user.address.longitude;
  console.log(lt, lg);
//   const store = new Store({
//     place: "Sheetla Mata Mandir, Gurugram",
//     location: {
//       type: "Point",
//       coordinates: [28.4231878, 76.8496613]
//     },
//     products: {
//       dairy: [{ name: "Milk", price: 90 }],
//       vegetables: [{ name: "Tomato", price: 100 }]
//     },
//     storePIN: "G001",
//     rating: 3
//   });
//   const items = new Item({
//     SPIN: "G001",
//     Snacks: [
//       { name: "Bhujia", price: 90, image: "bhujia" },
//       { name: "Bingo Tedhe Medhe", price: 20, image: "bingo" },
//       { name: "Yippee Noodles", price: 20, image: "yippee" },
//       { name: "Maggi", price: 20, image: "maggi" },
//       { name: "Dark Fantasy Biscuits", price: 50, image: "darkFantasy" },
//       { name: "Lays Chips", price: 10, image: "lays" }
//     ],
//     Beverages: [
//       { name: "Real Juice", price: 40, image: "real" },
//       { name: "Tang", price: 30, image: "tang" },
//       { name: "Rasna", price: 10, image: "rasna" },
//       { name: "Slice", price: 50, image: "slice" }
//     ],
//     Vegetables: [
//       { name: "Tomato", price: 40, image: "tomato" },
//       { name: "Potatoes", price: 30, image: "potato" },
//       { name: "Onions", price: 30, image: "onion" },
//       { name: "Green Chilli", price: 20, image: "greenChilli" }
//     ],
//     Fruits: [
//       { name: "Apple", price: 45, image: "apple" },
//       { name: "Mangoes", price: 50, image: "mangoes" },
//       { name: "Oranges", price: 20, image: "oranges" },
//       { name: "Bananas", price: 25, image: "bananas" },
//       { name: "Water Melon", price: 20, image: "waterMelon" }
//     ],
//     Dairy: [
//       { name: "Milk Saras 1L", price: 52, image: "sarasMilk" },
//       { name: "Amul Butter", price: 40, image: "amulButter" },
//       { name: "Lassi", price: 20, image: "lassi" },
//       { name: "Bread", price: 18, image: "bread" },
//       { name: "Eggs", price: 100, image: "eggs" }
//     ]
//   });
//   items.save(resu=>{
//       console.log(resu);

//       store.save(result=>{
//       console.log(result);
//       return res.render('shop/shop');
//   });
//  })
//   store.save(result=>{
//       console.log(result);
//       return res.render('shop/shop');
//   });
  Store.find({location:{$near:{$geometry:{type:"Point",coordinates:[lt,lg]},$maxDistance:30000}}})
  .then(result=>{
      console.log(result);

      return res.render('shop/list',{
          storearray:result
      });
  })
};

exports.getstoreitems = (req, res, next) => {
  var PIN = req.body.storePIN;
  console.log(PIN);
  Item.find({ SPIN: PIN })
    .then(result => {
      console.log(result[0]);
      res.render("store/category", {
        items: result[0]
      });
    })
    .catch(err => console.log(err));
};

exports.getdairyitems = (req, res, next) => {
  var PIN = req.params.Id;
  var category = req.params.category;
  console.log(PIN, "This is PIN");
  console.log(category, "This is category");
  Item.find({ SPIN: PIN })
    .then(result => {
      console.log(result);
      console.log(category);
      // console.log(result[0].Dairy);
      console.log(result[0][category]);

      res.render("store/items", {
        items: result[0][category],
        SPIN: PIN,
        category: category
      });
    })
    .catch(err => console.log(err));
};

exports.getproduct = (req, res, next) => {
  var PIN = req.params.SPIN;
  var prod = req.body.product;
  var cat = req.body.category;
  console.log(cat);
  Item.find({ SPIN: PIN })
    .then(result => {
      var leng = result[0][cat].length;
      console.log(leng);
      let flag = 1;
      for (let index = 0; index < leng; index++) {
        if (result[0][cat][index].name == prod) {
          console.log("Product found");
          res.render("store/product", {
            message: "found",
            object1: result[0][cat][index],
            Pin: PIN,
            Category: cat
          });
          flag = 0;
        }
      }
      if (flag == 1) {
        res.render("store/product", {
          message: "Nothing found",
          Pin: PIN,
          Category: cat
        });
      }
    })
    .catch(err => console.log(err));
};

exports.postcart = (req, res, next) => {
  const name = req.body.Name;
  const price = req.body.Price;
  let quantity = 1;
  let flag = 0;
  console.log(req.user);
  req.user.cart.items.forEach(a => {
    if (a.name == name) {
      console.log("item found");
      flag = 1;
      a.quantity += 1;
    }
  });
  if (flag == 0) {
    const item = { name, price, quantity };
    console.log(item);
    req.user.cart.items.push(item);
  }
  req.user.save();
  console.log(req.user.cart.items, "Here is the user cart");
  let mycart = req.user.cart.items;
  return ;
//   res.render("shop/cart", {
//     cart: mycart
//   });
};

exports.getcart = (req, res, next) => {
  let mycart = req.user.cart.items;
  res.render("shop/cart", {
    cart: mycart
  });
};

exports.addcart = (req, res, next) => {
  let name = req.params.Name;
  req.user.cart.items.forEach(a => {
    if (a.name == name) {
      a.quantity += 1;
    }
  });
  req.user.save();
  res.redirect("/getcart");
};

exports.removecart = (req, res, next) => {
  let name = req.params.Name;
  for (let a = 0; a < req.user.cart.items.length; a++) {
    if (req.user.cart.items[a].name == name) {
      req.user.cart.items[a].quantity -= 1;
    }
    if (req.user.cart.items[a].quantity == 0) {
      req.user.cart.items.splice(a, 1);
    }
  }

  req.user.save();
  res.redirect("/getcart");
};
