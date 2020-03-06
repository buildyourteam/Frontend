import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getPeopleData,
  getPeopleDataSuccess,
  getPeopleFail,
  getMainPeopleDataSuccess,
  getFindPeople
} from "../reducers/People";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// People 페이지에서 people
function* getPeopleLoad() {
  try {
    const url = window.location.pathname; // .split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    const res = yield call([axios, "get"], `${BASEURL}/index/peoples`);
    const resPeople = yield call(
      [axios, "get"],
      `${res.data._links.peopleList.href}`
    );
    //console.log(resPeople);
    const people = resPeople.data._embedded.peopleList;
    yield put(getMainPeopleDataSuccess(people));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleLoad() {
  yield takeLatest(getPeopleData, getPeopleLoad);
}

function* getFindPeopleLoad(action) {
  try {
    const data = action.payload;
    const res = yield call([axios, "get"], `${BASEURL}/index/people`);
    const resPeopleList = yield call(
      [axios, "get"],
      `${res.data._links.peopleList.href}`
    );
    //console.log(resPeopleList);
    try {
      const peopleData = resPeopleList.data._embedded.peopleList;
      yield put(getMainPeopleDataSuccess(peopleData));
    } catch (err) {
      yield put(getMainPeopleDataSuccess([]));
    }
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetFindPeopleLoad() {
  yield takeLatest(getFindPeople, getFindPeopleLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchGetPeopleLoad), fork(watchGetFindPeopleLoad)]);
}