import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchProcesses,
  cerateProcess,
  deleteProcess,
  selectAllProcessesWithStatus,
  useLiveUpdateProcesses,
} from 'features/processes';

import PageLayout from 'features/pageLayout';
import Table from 'features/table';
import Spinner from 'features/spinner';
import { LoadingStatuses } from 'features/lib';

import { selectLoadingStatus, selectIsNewProcessCreating } from '../processesPageSelector';
import { leaveProcessPage } from '../processesPageActions';

import { SpinnerContainer, CreateBtn } from './processesPageStyle';

export const ProcessesPage = () => {
  const dispatch = useDispatch();

  useLiveUpdateProcesses();

  useEffect(() => {
    dispatch(fetchProcesses());

    return () => {
      dispatch(leaveProcessPage());
    };
  }, [dispatch]);

  const cerateNewProcess = useCallback(() => {
    dispatch(cerateProcess());
  }, [dispatch]);

  const processes = useSelector(selectAllProcessesWithStatus);
  const loadingStatus = useSelector(selectLoadingStatus);
  const isNewProcessCreating = useSelector(selectIsNewProcessCreating);

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
        disableFilters: true,
        Header: 'Start time',
        accessor: 'startTime',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        disableFilters: true,
        Header: 'Jobs Count',
        accessor: 'jobsCount',
      },
      {
        disableFilters: true,
        Header: 'Status',
        accessor: 'status',
      },
      {
        disableFilters: true,
        Header: () => null,
        id: 'viewJobs',
        Cell: ({ row }) => <Link to={`/jobs/${row.values.id}`}>View jobs</Link>,
      },
      {
        disableSortBy: true,
        disableFilters: true,
        Header: () => null,
        id: 'deleteProcess',
        Cell: ({ value, row }) => (
          <button
            onClick={() => {
              dispatch(
                deleteProcess({
                  id: row.values.id,
                })
              );
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    [dispatch]
  );

  return (
    <PageLayout name="Processes">
      {loadingStatus === LoadingStatuses.SUCCEEDED && (
        <CreateBtn onClick={cerateNewProcess} disabled={isNewProcessCreating}>
          Create New Process
        </CreateBtn>
      )}

      {loadingStatus === LoadingStatuses.LOADING && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {loadingStatus === LoadingStatuses.SUCCEEDED && <Table data={processes} columns={columns} />}
    </PageLayout>
  );
};
