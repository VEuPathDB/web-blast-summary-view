import './globals';

import { RouteComponentProps } from 'react-router';
import { initialize } from '@veupathdb/web-common/lib/bootstrap';
import { RouteEntry } from '@veupathdb/wdk-client/lib/Core/RouteEntry';
import { ClientPluginRegistryEntry } from '@veupathdb/wdk-client/lib/Utils/ClientPlugin';

import BlastSummaryViewPlugin from './lib/Controllers/BlastSummaryViewController';
import * as blastSummaryViewStoreModule from './lib/StoreModules/BlastSummaryViewStoreModule';

import Header from './Header';
import Home from './Home';
import { endpoint, rootElement, rootUrl } from './constants';
import reportWebVitals from './reportWebVitals';

import '@veupathdb/wdk-client/lib/Core/Style/index.scss';
import '@veupathdb/web-common/lib/styles/client.scss';

initialize({
  rootUrl,
  rootElement,
  wrapRoutes: (routes: any): RouteEntry[] => [
    {
      path: '/',
      component: (props: RouteComponentProps<void>) => <Home />,
    },
    ...routes,
  ],
  wrapStoreModules: (storeModules: any) => ({
    ...storeModules,
    [blastSummaryViewStoreModule.key]: blastSummaryViewStoreModule,
  }),
  componentWrappers: {
    SiteHeader: () => Header,
  },
  pluginConfig: [
    {
      type: 'summaryView',
      name: 'blast-view',
      component: BlastSummaryViewPlugin,
    },
  ] as ClientPluginRegistryEntry<any>[],
  endpoint,
} as any);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
