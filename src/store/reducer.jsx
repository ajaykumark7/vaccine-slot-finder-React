const initialState = {
    vaccineSlotAPIResponse: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATEVACCINESLOTAPIRESPONSE":
            return {
                ...state,
                vaccineSlotAPIResponse: action.vaccineSlotAPIResponse
            };
        default:
            return state;
    };
}

export default reducer;