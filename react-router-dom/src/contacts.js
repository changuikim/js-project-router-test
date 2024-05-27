// localforage 라이브러리는 IndexedDB, WebSQL 또는 localStorage를 사용하여 데이터를 비동기적으로 저장하는 라이브러리입니다.
import localforage from 'localforage';
// match-sorter 라이브러리는 문자열 배열을 정렬하고 필터링하는 데 사용할 수 있는 강력한 도구입니다.
// matchSorter(items, value, options) 함수는 items 배열을 value 문자열과 일치하는 항목을 반환합니다.
import { matchSorter } from 'match-sorter';
// sort-by 라이브러리는 배열을 정렬하는 데 사용할 수 있는 간단한 도구입니다.
// sortBy(items, ...sorts) 함수는 items 배열을 sorts 배열에 따라 정렬합니다.
import sortBy from 'sort-by';

// fakeCache 객체는 네트워크 요청을 시뮬레이션하기 위해 사용하는 객체입니다.
let fakeCache = {};

// fakeNetwork 함수는 네트워크 요청을 시뮬레이션하는 함수입니다.
async function fakeNetwork(key) {
  // key가 없으면 fakeCache 객체를 초기화합니다.
  if (!key) {
    fakeCache = {};
  }

  // fakeCache 객체의 key의 값이 true이면 함수를 종료합니다.
  if (fakeCache[key]) {
    return;
  }

  // fakeCache 객체의 key의 값을 true로 설정합니다.
  fakeCache[key] = true;

  // setTimeout 함수를 사용하여 0~800ms 사이의 랜덤한 시간이 지난 후에 Promise 객체를 반환합니다.
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

// set 함수는 localforage 라이브러리를 사용하여 contacts 데이터를 localStorage에 저장하는 함수입니다.
// localforage.setItem(key, value) 함수는 key에 value를 저장합니다.
function set(contacts) {
  return localforage.setItem('contacts', contacts);
}

// getContacts 함수는 localforage 라이브러리를 사용하여 contacts 데이터를 localStorage에서 가져오는 함수입니다.
export async function getContacts(query) {
  // fakeNetwork 함수를 사용하여 getContacts 요청을 시뮬레이션합니다.
  await fakeNetwork(`getContacts:${query}`);
  // localforage.getItem(key) 함수를 사용하여 contacts 데이터를 가져옵니다.
  let contacts = await localforage.getItem('contacts');
  // contacts 데이터가 없으면 빈 배열을 반환합니다.
  if (!contacts) contacts = [];
  // query가 있으면 matchSorter 함수를 사용하여 contacts 데이터를 필터링합니다.
  // matchSorter(items, value, options) 함수는 items 배열을 value 문자열과 일치하는 항목을 반환합니다.
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
  }
  // contacts 데이터를 정렬하여 반환합니다.
  // sortBy(items, ...sorts) 함수는 items 배열을 sorts 배열에 따라 정렬합니다.
  return contacts.sort(sortBy('last', 'createdAt'));
}

// createContact 함수는 contacts 데이터를 생성하는 함수입니다.
export async function createContact() {
  // fakeNetwork 함수를 사용하여 createContact 요청을 시뮬레이션합니다.
  await fakeNetwork();
  // Math.random().toString(36).substring(2, 9) 함수를 사용하여 id를 생성합니다.
  let id = Math.random().toString(36).substring(2, 9);
  // id와 createdAt을 가지는 contact 객체를 생성합니다.
  let contact = { id, createdAt: Date.now() };
  // getContacts 함수를 사용하여 contacts 데이터를 가져옵니다.
  let contacts = await getContacts();
  // contact 객체를 contacts 배열의 맨 앞에 추가합니다.
  // unshift() 메서드는 배열의 맨 앞에 하나 이상의 요소를 추가하고, 새로운 길이를 반환합니다.
  contacts.unshift(contact);
  // set 함수를 사용하여 contacts 데이터를 저장합니다.
  await set(contacts);
  // contact 객체를 반환합니다.
  return contact;
}

// getContact 함수는 id에 해당하는 contact 데이터를 가져오는 함수입니다.
export async function getContact(id) {
  // fakeNetwork 함수를 사용하여 getContact 요청을 시뮬레이션합니다.
  await fakeNetwork(`contact:${id}`);
  // localforage.getItem(key) 함수를 사용하여 contacts 데이터를 가져옵니다.
  let contacts = await localforage.getItem('contacts');
  // contacts 배열에서 id에 해당하는 contact 객체를 찾아 반환합니다.
  // find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없으면 undefined를 반환합니다.
  let contact = contacts.find((contact) => contact.id === id);
  // contact 객체가 없으면 null을 반환합니다.
  return contact ?? null;
}

// updateContact 함수는 id에 해당하는 contact 데이터를 업데이트하는 함수입니다.
export async function updateContact(id, updates) {
  // fakeNetwork 함수를 사용하여 updateContact 요청을 시뮬레이션합니다.
  await fakeNetwork();
  // localforage.getItem(key) 함수를 사용하여 contacts 데이터를 가져옵니다.
  let contacts = await localforage.getItem('contacts');
  // contacts 배열에서 id에 해당하는 contact 객체를 찾습니다.
  let contact = contacts.find((contact) => contact.id === id);
  // contact 객체가 없으면 에러를 발생시킵니다.
  if (!contact) throw new Error('No contact found for', id);
  // contact 객체를 업데이트합니다.
  // Object.assign() 메서드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다.
  Object.assign(contact, updates);
  // set 함수를 사용하여 contacts 데이터를 저장합니다.
  await set(contacts);
  // contact 객체를 반환합니다.
  return contact;
}

// deleteContact 함수는 id에 해당하는 contact 데이터를 삭제하는 함수입니다.
export async function deleteContact(id) {
  // fakeNetwork 함수를 사용하여 deleteContact 요청을 시뮬레이션합니다.
  let contacts = await localforage.getItem('contacts');
  // contacts 배열에서 id에 해당하는 contact 객체의 인덱스를 찾습니다.
  // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 그런 요소가 없으면 -1을 반환합니다.
  let index = contacts.findIndex((contact) => contact.id === id);
  // index가 -1이상이면 contacts 배열에서 index에 해당하는 요소를 삭제합니다.
  if (index > -1) {
    contacts.splice(index, 1);
    // set 함수를 사용하여 contacts 데이터를 저장합니다.
    await set(contacts);
    return true;
  }
  return false;
}
