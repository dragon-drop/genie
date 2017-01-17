import { createApp } from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import accountsModule from './modules/accounts';
import productsModule from './modules/products';
import retailersModule from './modules/retailers';
import customersModule from './modules/customers';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(accountsModule);
app.loadModule(productsModule);
app.loadModule(retailersModule);
app.loadModule(customersModule);
app.init();
