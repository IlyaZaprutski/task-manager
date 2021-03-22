import { useParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProcess, useLiveUpdateProcesses } from 'features/processes';
import PageLayout from 'features/pageLayout';
import { selectJobsByProcessId } from 'features/jobs';
import Table from 'features/table';
import Spinner from 'features/spinner';
import { LoadingStatuses } from 'features/lib';

import { leaveProcessJobPage } from '../processJobsPageActions';
import { selectLoadingStatus } from '../processJobsPageSelector';

import { GoBackLink, SpinnerContainer } from './processJobsStyle';

export const ProcessJobsPage = () => {
  const dispatch = useDispatch();

  const { processId } = useParams();

  useLiveUpdateProcesses(processId);

  useEffect(() => {
    dispatch(fetchProcess({ id: processId }));

    return () => {
      dispatch(leaveProcessJobPage());
    };
  }, [dispatch, processId]);

  const loadingStatus = useSelector(selectLoadingStatus);
  const jobs = useSelector((state) => selectJobsByProcessId(state, processId));

  const columns = useMemo(
    () => [
      {
        disableSortBy: true,
        disableFilters: true,
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        disableSortBy: true,
        disableFilters: true,
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  return (
    <PageLayout name={`Jobs`}>
      <GoBackLink to={`/`}>Go back</GoBackLink>

      {loadingStatus === LoadingStatuses.LOADING && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {loadingStatus === LoadingStatuses.SUCCEEDED && <Table data={jobs} columns={columns} />}
    </PageLayout>
  );
};
