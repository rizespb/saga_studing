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
} from "@redux-saga/core/effects";

async function getPeople(pattern) {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/${pattern}`
  );

  const data = await request.json();
  return data;
}

//////////////////////////////////////////////////////////
/// WORKER

export function* loadPeople() {
  // call - для вызова асинхронных функций. Вторым, третьим и т.д. параметром мы можем передать параметры в вызываемую функцию
  // В нашем примере парамаетры не нужны: arg1, arg2 для наглядности
  // Использвоание yield перед вызовом асинхронной функции говорит Саге дождаться выполнения асинхронного кода аналогично await
  // В примере получали планеты с сервера StarWars API
  const people = yield call(getPeople, "users");
  console.log("people: ", people);

  yield put({ type: "SET_PEOPLE", payload: people });
  console.log("Load pepole");
  return people;
}

export function* loadPlanets() {
  const planets = yield call(getPeople, "posts");
  console.log("planets: ", planets);

  yield put({ type: "SET_PLANETS", payload: planets });
  console.log("Load planets");
}

export function* workerSaga() {
  console.log("Run parallel tasks");
  yield call(loadPeople);
  yield call(loadPlanets);

  const state = yield select((state) => state);
  console.log("Finish parallel tasks with peoplу from join: ", state);
}

//////////////////////////////////////////////////////////
/// WATCHER
export function* watchLoadDataSaga() {
  // Передаем в take тип нашего action
  // while (true) {
  //   yield take("CLICK");
  //   yield workerSaga();
  // }

  // Эквивалент циклу while выше
  // yield takeEvery("CLICK", workerSaga);
  // yield takeLatest("CLICK", workerSaga);
  // yield takeLeading("CLICK", workerSaga);

  yield takeEvery("LOAD_DATA", workerSaga);
}

///////////////////////////////////////////////////
/// ROOTSAGA
export default function* rootSaga() {
  console.log("Saga ready");

  // при запуске саги rootSaga запуститься watcherClickSaga
  yield fork(watchLoadDataSaga);
}


