import { createApp } from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import accountsModule from './modules/accounts';
import productsModule from './modules/products';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(accountsModule);
app.loadModule(productsModule);
app.init();
