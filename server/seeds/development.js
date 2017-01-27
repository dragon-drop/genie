import { Meteor } from 'meteor/meteor';
import { Retailers, Skus, Products } from '/lib/collections';

export default function () {
  // create a retailer
  Retailers.remove({});
  Products.remove({});
  Skus.remove({});
  Meteor.call('retailer.create', { _id: 'jigslaw', name: "Jig Slah'" });

  // create some products for the retailer
  let i = 10;
  while (--i) {
    let j = 4;
    const skus = [];

    while (--j) {
      skus.push({
        _id: `${i}_${j}`,
      });
    }

    const product = {
      _id: `${i}`,
      retailerId: 'jigslaw',
      skus,
    };

    Meteor.call('product.create', 'jigslaw', product);
  }
}
