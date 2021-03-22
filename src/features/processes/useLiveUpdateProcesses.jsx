import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { startPoll, stopPoll, LIVE_POLLING_DELAY_IN_SECONDS } from 'features/lib';

import { fetchProcessesInBackground } from './processesActions';

export const useLiveUpdateProcesses = (id) => {
  const dispatch = useDispatch();

  const pollingKey = 'processes-polling';

  useEffect(() => {
    dispatch(
      startPoll({
        action: fetchProcessesInBackground,
        payload: {
          id,
        },
        key: pollingKey,
        delay: LIVE_POLLING_DELAY_IN_SECONDS * 1000,
      })
    );

    return () => {
      dispatch(stopPoll({ key: pollingKey }));
    };
  }, [dispatch, id]);
};
