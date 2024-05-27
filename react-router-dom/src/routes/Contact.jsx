/* eslint-disable react/prop-types */
import { Form, useLoaderData, useFetcher } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

// loader 함수는 contactId에 해당하는 contact 데이터를 가져오는 함수입니다.
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', { status: 404, statusText: 'Not Found' });
  }
  return { contact };
}

// Favorite 컴포넌트는 contact 데이터의 favorite 속성을 토글하는 함수입니다.
function Favorite({ contact }) {
  // useFetcher 훅의 fetcher 함수는 탐색을 유발하지 않고 로더 및 액션과 통신할 수 있습니다.
  const fetcher = useFetcher();

  // 재할당을 위해 let 키워드를 사용하여 favorite 변수를 선언합니다.
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    /*
      https://reactrouter.com/en/main/components/form
      Form은 HTML form 요소와 유사하지만, 자동으로 submit 이벤트를 방지하고,
      submit 이벤트를 처리하는 대신 onSubmit 콜백을 제공합니다.
    */
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}

// action 함수는 contact 데이터의 favorite 속성을 업데이트하는 함수입니다.
export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

// Contact 컴포넌트는 contact 데이터를 렌더링하는 함수입니다.
export default function Contact() {
  // useLoaderData 훅을 사용하여 contact 데이터를 가져옵니다.
  // useLoaderData 훅은 현재 경로의 로더 함수에서 반환된 데이터를 반환합니다.
  // 즉, loader 함수에서 반환된 contact 객체를 비구조화 할당하여 contact 변수에 저장합니다.
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>이름 없음</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">수정</button>
          </Form>
          {/* 
              https://reactrouter.com/en/main/components/form
              Form은 HTML form 요소와 유사하지만, 자동으로 submit 이벤트를 방지하고,
              submit 이벤트를 처리하는 대신 onSubmit 콜백을 제공합니다.
           */}
          <Form
            method="post"
            action="destroy"
            // onSubmit 이벤트 핸들러를 사용하여 confirm 함수를 사용하여 데이터 삭제 여부를 확인합니다.
            // confirm 함수는 사용자에게 메시지를 표시하고 확인 또는 취소 버튼을 클릭할 때까지 기다립니다.
            // event.preventDefault() 함수를 사용하여 이벤트의 기본 동작을 취소합니다.
            onSubmit={(event) => {
              if (!confirm('이 데이터를 정말 삭제하시겠습니까?')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">삭제</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
