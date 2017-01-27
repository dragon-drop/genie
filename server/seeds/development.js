import { Meteor } from 'meteor/meteor';
import cleaner from 'meteor/xolvio:cleaner';

export default function () {
  // create a retailer
  cleaner.resetDatabase();
  Meteor.call('retailer.create', { _id: 'jigslaw', name: "Jig Slah'" });
  Meteor.call('retailer.create', { _id: 'smintpelvic', name: 'Smint Pelvic' });

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
        retailerId,
        skus,
      };

      Meteor.call('product.create', retailerId, product);
    }
  });
}
