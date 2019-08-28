export default function details(state = {
    info: {
        author: {},
        replies: []
    },
    loading: true
}, action) {
    switch (action.type) {
        case 'INFO_DETAIL':
            return {
                loading: true,
                info: state.info
            }
            break;
        case 'INFO_DETAIL_SUCCESS':
            return {
                loading: false,
                info: action.data.data
            }
            break;
        case 'INFO_DETAIL_ERROR':
            return {
                loading: false,
                info: {}
            }
            break;

        default:
            return state;
            break;
    }
}