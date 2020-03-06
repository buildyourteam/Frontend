import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMainData } from '../reducers/Project';
import { getMainPeopleData } from '../reducers/People';

export function useLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Project);
  const [loadState, setLoadState] = useState({
    open: false,
    text: '로딩 중...',
  }); // 메시지 상태메시지

  useEffect(() => {
    if (isLoading) {
      setLoadState({ ...loadState, open: true });
    } else if (isError) {
      setLoadState({ ...loadState, open: false });
    } else {
      setLoadState({ ...loadState, open: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);
  return [{ loadState }, setLoadState, dispatch];
}

export const useDefaultData = () => {
  const dispatch = useDispatch();
  const { projectCard } = useSelector(state => state.Project);
  const [hotProjectState, setHotProjectState] = useState([
    {
      imgUrl: '',
      projectName: '',
      teamName: '',
      currentMember: {
        developer: 0,
        planner: 0,
        etc: 0,
        designer: 0,
      },
      needMember: {
        developer: 0,
        planner: 0,
        etc: 0,
        designer: 0,
      },

      endDay: '',
      dday: 0,
    },
  ]);
  useEffect(() => {
    const defaultData = {
      pageNum: 10,
    };
    dispatch(getMainData(defaultData));
  }, [dispatch]);

  useEffect(() => {
    setHotProjectState(projectCard);
  }, [projectCard]);

  return [{ hotProjectState }, setHotProjectState];
};

export const useDefaultPeopleData = () => {
  const dispatch = useDispatch();
  const { peopleCard } = useSelector(state => state.People);
  const [hotPeopleState, setHotPeopleState] = useState([
    {
      userId: '',
      imgUrl: '',
      userName: '',
      stack: '',
      level: 0,
    },
  ]);
  useEffect(() => {
    const defaultData = {
      pageNum: 10,
    };
    dispatch(getMainPeopleData(defaultData));
  }, [dispatch]);

  useEffect(() => {
    setHotPeopleState(peopleCard);
  }, [peopleCard]);

  return [{ hotPeopleState }, setHotPeopleState];
};