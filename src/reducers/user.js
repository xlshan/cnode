export default function user(state = {
    data: {
        avatar_url: '', loginname: '', score: '', create_at: '', recent_replies: [], recent_topics: []
    }
}, action) {
    switch (action.type) {
        case 'USER_INFO':
            return {
                data: state.data,
                loading: true
            }
            break;
        case 'USER_INFO_SUCCESS':
            return {
                data: action.data.data,
                loading: false
            }
            break;
        case 'USER_INFO_ERROR':
            return {
                data: {},
                loading: false
            }
            break;

        default:
            return state;
            break;
    }
}