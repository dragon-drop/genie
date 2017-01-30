import { Meteor } from 'meteor/meteor';
import cleaner from 'meteor/xolvio:cleaner';

export default function () {
  // create a retailer
  cleaner.resetDatabase();
  Meteor.call('retailer.create', { _id: 'jigslaw', name: "Jig Slah'", product_url: `http://www.jigsaw-online.com/product/:name/:_id` });
  Meteor.call('retailer.create', { _id: 'smintpelvic', name: 'Smint Pelvic', product_url: `http://www.mintvelvet.co.uk/:name/-/mint-v/fcp-product/:_id` });

  // create some products for the retailer

  const retailerIds = ['jigslaw', 'smintpelvic'];

  retailerIds.forEach((retailerId) => {
    let i = 10;
    while (--i) {
      let j = 4;
      const skus = [];

      while (--j) {
        skus.push({
          _id: `${retailerId}_${i}_${j}`,
        });
      }

      const product = {
        _id: `${retailerId}_${i}`,
        name: `${retailerId} ${i}`,
        retailerId,
        skus,
      };

      Meteor.call('product.create', retailerId, product);
    }
  });

  Meteor.call('product.create', 'jigslaw', {
    _id: 'J31241_GY003',
    name: 'Italian Jersey Raw Cut Coat',
    retailerId: 'jigslaw',
    skus: [
      { _id: 'J31241_GY003S' },
      { _id: 'J31241_GY003M' },
      { _id: 'J31241_GY003L' },
    ]
  });
}
