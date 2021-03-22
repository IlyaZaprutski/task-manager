import { createAction } from '@reduxjs/toolkit';

export const fetchProcesses = createAction('FETCH_PROCESSES');
export const fetchProcessesStarted = createAction('FETCH_PROCESSES_STARTED');
export const fetchProcessesSuccess = createAction('FETCH_PROCESSES_SUCCESS');
export const fetchProcessesFailed = createAction('FETCH_PROCESSES_FAILED');

export const fetchProcess = createAction('FETCH_PROCESS');
export const fetchProcessStarted = createAction('FETCH_PROCESS_STARTED');
export const fetchProcessSuccess = createAction('FETCH_PROCESS_SUCCESS');
export const fetchProcessFailed = createAction('FETCH_PROCESS_FAILED');

export const cerateProcess = createAction('CREATE_PROCESS');
export const cerateProcessStarted = createAction('CREATE_PROCESS_STARTED');
export const createProcessSuccess = createAction('CREATE_PROCESS_SUCCESS');
export const createProcessFailed = createAction('CREATE_PROCESS_FAILED');


export const deleteProcess = createAction('DELETE_PROCESS');
export const deleteProcessStarted = createAction('DELETE_PROCESS_STARTED');
export const deleteProcessSuccess = createAction('DELETE_PROCESS_SUCCESS');
export const deleteProcessFailed = createAction('DELETE_PROCESS_FAILED');


export const fetchProcessesInBackground = createAction('FETCH_PROCESSES_IN_BACKGROUND');
