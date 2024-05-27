import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';
import { useEffect } from 'react';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

/*
  https://reactrouter.com/en/main/route/loader
  https://reactrouter.com/en/main/hooks/use-loader-data
  데이터를 로드하는 데 사용할 API는 Loader와 useLoaderData 두 가지입니다. 
  먼저 루트 모듈에서 로더 함수를 생성하고 내보낸 다음 경로에 연결합니다. 
  마지막으로 데이터에 액세스하고 렌더링합니다.  
*/
export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const contacts = await getContacts(query);
  return { contacts, query };
}

export default function Root() {
  const { contacts, query } = useLoaderData();
  /*
    https://reactrouter.com/en/main/hooks/use-navigation
    useNavigation은 현재 네비게이션 상태를 제공합니다.
    "idle" | "submitting" | "loading" 중 하나의 상태입니다.
  */
  const navigation = useNavigation();
  /*
    https://reactrouter.com/en/main/hooks/use-submit
    useSubmit은 폼을 제출할 때 사용할 수 있는 콜백을 제공합니다.
  */
  const submit = useSubmit();

  /*
    navigation.location은 현재 URL을 나타내는 Location 객체입니다.
    URLSearchParams는 URL의 쿼리 문자열을 쉽게 다룰 수 있게 해줍니다.
    navigation.location.search는 URL의 쿼리 문자열을 반환합니다.
    URLSearchParams.has() 메서드는 주어진 이름의 매개변수가 존재하는지 여부를 반환합니다.
  */
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('query');

  useEffect(() => {
    document.getElementById('query').value = query;
  }, [query]);

  return (
    <>
      <div id="sidebar">
        <h1>리액트 라우터 연락처</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="query"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="query"
              defaultValue={query}
              onChange={(event) => {
                const isFirstSearch = query == null;
                submit(event.currentTarget.form, {
                  replace: isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* 
            https://reactrouter.com/en/main/components/form
            Form은 HTML form 요소와 유사하지만, 자동으로 submit 이벤트를 방지하고,
            submit 이벤트를 처리하는 대신 onSubmit 콜백을 제공합니다.
          */}
          <Form method="post">
            <button type="submit">NEW</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* 
                        https://reactrouter.com/en/main/components/link
                        클라이언트 측 라우팅을 사용하면 앱이 서버에 다른 문서를 요청하지 않고도 URL을 업데이트할 수 있습니다. 
                        대신 앱은 즉시 새 UI를 렌더링할 수 있습니다. Link를 통해 이를 실현합니다.
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>이름 없음</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
                  */}
                  {/* 
                        https://reactrouter.com/en/main/components/nav-link
                        NavLink는 현재 URL이 링크의 to 속성과 일치하는지 확인하고, 
                        일치하면 CSS 클래스를 추가하여 스타일을 변경할 수 있습니다.
                   */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>이름 없음</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>연락처 없음</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        {/*
            https://reactrouter.com/en/main/components/outlet
            루트 경로에 하위 경로를 렌더링할 위치를 알려줘야 합니다. Outlet으로 이를 수행합니다
        */}
        <Outlet />
      </div>
    </>
  );
}
