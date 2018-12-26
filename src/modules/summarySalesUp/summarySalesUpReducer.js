/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summarySalesUpReducer(state = initialState.summarySalesUp, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_SUMMARY_SALES_UP:
            return {
                ...state,
                ...{
                    isLoading: true,

                }
            };
        case types.LOAD_SUMMARY_SALES_SUCCESS_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                    summary: action.summary,
                }
            };
        case types.LOAD_SUMMARY_SALES_ERROR_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        default:
            return state;
    }
}

