const BASE_URL = '/users'

const endpoints = {
	register: BASE_URL,
	registerFull: (uuid: string) => `${BASE_URL}/${uuid}/complete-registration`,
	login: `${BASE_URL}/login`,
	createSession: `${BASE_URL}/training-sessions`
}

export default endpoints
