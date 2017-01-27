import users from './users';
import customer from './customer';
import wishlist from './wishlist';
import product from './product';
import retailer from './retailer';
import accounts from './accounts';

export default function () {
  users();
  customer();
  wishlist();
  product();
  retailer();
  accounts();
}
