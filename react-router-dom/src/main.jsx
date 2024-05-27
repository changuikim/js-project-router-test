import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/Contact.jsx';
import EditContact, { action as editAction } from './routes/Edit.jsx';
import { action as destroyAction } from './routes/Destroy.jsx';
import Index from './routes/Index.jsx';

/*
  https://reactrouter.com/en/main/routers/create-browser-router
  모든 React 라우터 웹 프로젝트에 권장되는 라우터입니다. DOM 히스토리 API를 사용하여 URL을 업데이트하고 히스토리 스택을 관리합니다.
  또한 로더, 액션, 페처 등과 같은 v6.4 데이터 API를 사용할 수 있습니다.
*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    /*
      https://reactrouter.com/en/main/route/loader
      https://reactrouter.com/en/main/hooks/use-loader-data
      데이터를 로드하는 데 사용할 API는 Loader와 useLoaderData 두 가지입니다. 
      먼저 루트 모듈에서 로더 함수를 생성하고 내보낸 다음 경로에 연결합니다. 
      마지막으로 데이터에 액세스하고 렌더링합니다.  
    */
    loader: rootLoader,
    /*
      https://reactrouter.com/en/main/route/action
      액션은 라우트가 렌더링되기 전에 실행되는 함수입니다. 
      이를 통해 라우트가 렌더링되기 전에 데이터를 미리 로드하거나 다른 작업을 수행할 수 있습니다.
    */
    action: rootAction,
    /*
        https://reactrouter.com/en/main/components/outlet
        루트 경로에 하위 경로를 렌더링할 위치를 알려줘야 합니다. Outlet으로 이를 수행합니다
    */
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
