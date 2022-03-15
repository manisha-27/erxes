import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { initBroker } from './messageBroker';
import { initMemoryStorage } from './inmemoryStorage';
import { generateAllDataLoaders } from './dataloaders';
import { coreModels, generateModels, models } from './connectionResolver';
import logs from './logUtils';

export let debug;
export let mainDb;
export let serviceDiscovery;

export default {
  name: 'products',
  graphql: async (sd) => {
    serviceDiscovery = sd;
    
    return {
      typeDefs: await typeDefs(sd),
      resolvers
    }
  },
  apolloServerContext: context => {
    const subdomain = 'os';

    context.subdomain = subdomain;
    context.models = models;
    context.coreModels = coreModels;
    context.dataLoaders = generateAllDataLoaders(models, subdomain);

    return context;
  },
  meta: { logs: { consumers: logs } },
  onServerInit: async options => {
    mainDb = options.db;

    await generateModels('os')

    initBroker(options.messageBrokerClient);

    initMemoryStorage();

    debug = options.debug;
  }
};