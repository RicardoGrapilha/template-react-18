import React, { Suspense, lazy, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import BaseLayout from './layouts/BaseLayout';
import SidebarLayout from './layouts/SidebarLayout';
import SuspenseLoader from './components/SuspenseLoader';

// Typing for the Loader function
const Loader = <P extends object>(Component: ComponentType<P>) => (props: P) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('./content/overview')));

// Dashboards
const Tasks = Loader(lazy(() => import('./content/dashboards/Tasks')));

// Applications
const Messenger = Loader(lazy(() => import('./content/applications/Messenger')));
const Transactions = Loader(lazy(() => import('./content/applications/Transactions')));
const UserProfile = Loader(lazy(() => import('./content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('./content/applications/Users/settings')));

// Components
const Buttons = Loader(lazy(() => import('./content/pages/Components/Buttons')));
const Modals = Loader(lazy(() => import('./content/pages/Components/Modals')));
const Accordions = Loader(lazy(() => import('./content/pages/Components/Accordions')));
const Tabs = Loader(lazy(() => import('./content/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('./content/pages/Components/Badges')));
const Tooltips = Loader(lazy(() => import('./content/pages/Components/Tooltips')));
const Avatars = Loader(lazy(() => import('./content/pages/Components/Avatars')));
const Cards = Loader(lazy(() => import('./content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('./content/pages/Components/Forms')));

// Status
const Status404 = Loader(lazy(() => import('./content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('./content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('./content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('./content/pages/Status/Maintenance')));
const BinanceMain = Loader(lazy(() => import('./content/pages/Components/BinanceMain')));
const Calculator = Loader(lazy(() => import('./content/pages/Components/Calculator')));
const CryptoChart = Loader(lazy(() => import('./content/pages/Components/Calculator/CryptoChart')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      },
      {
        path: 'binance',
        element: <BinanceMain />
      },
      {
        path: 'calculator',
        element: <Calculator />
      },
      {
        path: 'cryptoChart',
        element: <CryptoChart />
      }
    ]
  }
];

export default routes;
