import {
  take,
  takeEvery,
  takeLatest,
  takeLeading,
  put,
  call,
  fork,
  spawn,
  join,
  select,
  all,
  delay,
} from "@redux-saga/core/effects";

///////////////////////////////////////////////////////
/// Саги, запускаемые при загрузке приложения

function* auth() {
  yield delay(2000);
  return true;
}

function* loadUsers() {
  const request = yield call(fetch, "https://swapi.dev/api/people");
  const data = yield call([request, request.json]);
  console.log("data", data);
}

export function* loadBasicData() {
  console.log("loadBasicData");

  // Делаем запросы сразу после загрузки страницы
  yield all([fork(auth), fork(loadUsers)]);
}
