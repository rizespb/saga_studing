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
import { loadBasicData } from "./initialSagas";

export default function* rootSaga() {
  console.log("Saga");

  const sagas = [loadBasicData];

  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          // Завершаем цикл после вызова саги
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}
