/**
 * Created by nangbandem
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function printOrderReducer(state = initialState.printOrder, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_CONFIRM_PRINT_ORDER:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CONFIRM_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.CONFIRM_PRINT_ORDER_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
        case types.BEGIN_LOAD_PRINT_ORDERS:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_PRINT_ORDERS_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                listPrintOrder: action.listPrintOrder,
                paginator: action.paginator,
            };
        }

        case types.LOAD_PRINT_ORDERS_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case types.BEGIN_LOAD_ALL_GOODS_PRINT_ORDER:
            return {
                ...state,
                isLoadingGoods: true,
            };
        case types.LOAD_ALL_GOODS_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoadingGoods: false,
                goods: getSelectArray(action.goods),
            };
        }

        case types.LOAD_ALL_GOODS_PRINT_ORDER_ERROR:
            return {
                ...state,
                isLoadingGoods: false,
            };

        case types.BEGIN_LOAD_ALL_COMPANIES_PRINT_ORDER:
            return {
                ...state,
                isLoadingCompanies: true,
            };
        case types.LOAD_ALL_COMPANIES_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoadingCompanies: false,
                companies: getSelectArray(action.companies),
            };
        }

        case types.LOAD_ALL_COMPANIES_PRINT_ORDER_ERROR:
            return {
                ...state,
                isLoadingCompanies: false,
            };

        case types.BEGIN_CREATE_PRINT_ORDER:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isCommitting: false,
            };
        }
        case types.CREATE_PRINT_ORDER_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
        case types.BEGIN_EDIT_PRINT_ORDER:
            return {
                ...state,
                isCommitting: true,
            };
        case types.EDIT_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isCommitting: false,
            };
        }
        case types.EDIT_PRINT_ORDER_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
        case types.LOAD_CODES_PRINT_ORDER_SUCCESS:{

            return {
                ...state,
                codes: getSelectArrCode(action.codes),
            };
        }
        case types.BEGIN_LOAD_PROPERTIES_PRINT_ORDER:{

            return {
                ...state,
                isLoadingPropers: true,
            };
        }
        case types.LOAD_PROPERTIES_PRINT_ORDER_SUCCESS:{

            return {
                ...state,
                isLoadingPropers: false,
                properties: action.properties,
            };
        }
        case types.LOAD_PROPERTIES_PRINT_ORDER_ERROR:{

            return {
                ...state,
                isLoadingPropers: false,
            };
        }

        default:
            return state;
    }
}

function getSelectArray(arr){
    return arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
}

function getSelectArrCode(arr) {
    let res =  arr.filter(obj => (obj && obj.id && obj.code)).map(obj => {
        return ({...obj, value: obj.id, label: obj.code});
    });
    return [{id: '', code: 'Tất cả',value: '', label: 'Tất cả'},...res];
}