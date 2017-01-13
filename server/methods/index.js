import users from './users';
import customer from './customer';
import wishlist from './wishlist';
import product from './product';
import sku from './sku';

export default function () {
  users();
  customer();
  wishlist();
  product();
  sku();
}
