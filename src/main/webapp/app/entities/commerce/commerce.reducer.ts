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

import { ICommerce, defaultValue } from 'app/shared/model/commerce.model';

export const ACTION_TYPES = {
  FETCH_COMMERCE_LIST: 'commerce/FETCH_COMMERCE_LIST',
  FETCH_COMMERCE: 'commerce/FETCH_COMMERCE',
  CREATE_COMMERCE: 'commerce/CREATE_COMMERCE',
  UPDATE_COMMERCE: 'commerce/UPDATE_COMMERCE',
  DELETE_COMMERCE: 'commerce/DELETE_COMMERCE',
  RESET: 'commerce/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICommerce>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CommerceState = Readonly<typeof initialState>;

// Reducer

export default (state: CommerceState = initialState, action): CommerceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMMERCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMMERCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMMERCE):
    case REQUEST(ACTION_TYPES.UPDATE_COMMERCE):
    case REQUEST(ACTION_TYPES.DELETE_COMMERCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMMERCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMMERCE):
    case FAILURE(ACTION_TYPES.CREATE_COMMERCE):
    case FAILURE(ACTION_TYPES.UPDATE_COMMERCE):
    case FAILURE(ACTION_TYPES.DELETE_COMMERCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMERCE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_COMMERCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMMERCE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMMERCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMMERCE):
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

const apiUrl = 'api/commerce';

// Actions

export const getEntities: ICrudGetAllAction<ICommerce> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMMERCE_LIST,
    payload: axios.get<ICommerce>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICommerce> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMMERCE,
    payload: axios.get<ICommerce>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICommerce> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMMERCE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<ICommerce> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMMERCE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICommerce> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMMERCE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
