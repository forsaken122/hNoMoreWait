import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQueue, defaultValue } from 'app/shared/model/queue.model';

export const ACTION_TYPES = {
  FETCH_QUEUE_LIST: 'queue/FETCH_QUEUE_LIST',
  FETCH_QUEUE: 'queue/FETCH_QUEUE',
  CREATE_QUEUE: 'queue/CREATE_QUEUE',
  UPDATE_QUEUE: 'queue/UPDATE_QUEUE',
  DELETE_QUEUE: 'queue/DELETE_QUEUE',
  RESET: 'queue/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQueue>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type QueueState = Readonly<typeof initialState>;

// Reducer

export default (state: QueueState = initialState, action): QueueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUEUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUEUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_QUEUE):
    case REQUEST(ACTION_TYPES.UPDATE_QUEUE):
    case REQUEST(ACTION_TYPES.DELETE_QUEUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUEUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUEUE):
    case FAILURE(ACTION_TYPES.CREATE_QUEUE):
    case FAILURE(ACTION_TYPES.UPDATE_QUEUE):
    case FAILURE(ACTION_TYPES.DELETE_QUEUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUEUE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_QUEUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUEUE):
    case SUCCESS(ACTION_TYPES.UPDATE_QUEUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUEUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/queues';

// Actions

export const getEntities: ICrudGetAllAction<IQueue> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUEUE_LIST,
    payload: axios.get<IQueue>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IQueue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUEUE,
    payload: axios.get<IQueue>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IQueue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUEUE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQueue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUEUE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQueue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUEUE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
