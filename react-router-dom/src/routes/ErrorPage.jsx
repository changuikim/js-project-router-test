import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  /*
    https://reactrouter.com/en/main/hooks/use-route-error
    https://reactrouter.com/en/main/utils/is-route-error-response
    useRouteError는 발생한 오류를 제공합니다. 사용자가 존재하지 않는 경로로 이동하면
    "찾을 수 없음" 상태 텍스트가 포함된 오류 응답을 받게 됩니다.   
  */
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
