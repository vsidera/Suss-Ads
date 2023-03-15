export const {REACT_APP_NEXUS_URL } = process.env;

export default {
    LOGIN_URL: `${REACT_APP_NEXUS_URL}/public/user/token`,
    LIST_CONTACTS: `${REACT_APP_NEXUS_URL}/api/v1/message/:app_id/list`,
};