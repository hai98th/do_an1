/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summaryMarketingCampaignReducer(state = initialState.summaryMarketingCampaign, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA_SUMMARY_MARKETING_CAMPAIGN:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false
                }
            };
        case types.LOAD_GENS_SUMMARY_MARKETING_CAMPAIGN_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_SUMMARY_MARKETING_CAMPAIGN_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true
                }
            };
        case types.BEGIN_LOAD_BASES_DATA_SUMMARY_MARKETING_CAMPAIGN:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
            case types.BEGIN_LOAD_SUMMARY_MARKETING_CAMPAIGN:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_SUMMARY_MARKETING_CAMPAIGN_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    summary: action.summary,
                }
            };
        case types.LOAD_SUMMARY_MARKETING_CAMPAIGN_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}

