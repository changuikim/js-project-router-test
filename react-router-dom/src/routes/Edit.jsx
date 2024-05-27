import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact } from '../contacts';

// action 함수는 contact 데이터를 업데이트하는 함수입니다.
// request 객체를 매개변수로 받아와서 formData() 메서드를 사용하여 form 데이터를 가져옵니다.
export async function action({ request, params }) {
  // formData() 메서드는 요청 본문을 FormData 객체로 변환합니다.
  const formData = await request.formData();
  // updates 객체에 formData를 변환하여 저장합니다.
  // Object.fromEntries() 메서드는 key-value 쌍의 목록을 객체로 변환합니다.
  const updates = Object.fromEntries(formData);
  // updateContact 함수를 사용하여 contact 데이터를 업데이트합니다.
  await updateContact(params.contactId, updates);
  // redirect 함수를 사용하여 contactId에 해당하는 contact 데이터로 이동합니다.
  // 리다이렉트는 클라이언트 측 라우팅을 사용하여 앱이 서버에 다른 문서를 요청하지 않고도 URL을 업데이트할 수 있습니다.
  return redirect(`/contacts/${params.contactId}`);
}

// EditContact 컴포넌트는 contact 데이터를 수정하는 함수입니다.
export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>이름</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>아바타 URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>노트</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label>
      <p>
        <button type="submit">저장</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </button>
      </p>
    </Form>
  );
}
