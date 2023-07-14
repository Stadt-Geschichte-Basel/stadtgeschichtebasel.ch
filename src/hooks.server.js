/**
 * This function handles incoming requests and sets a cookie for the user if it's their first time visiting the app.
 * @param {Object} options - The options object.
 * @param {Object} options.event - The incoming event object.
 * @param {Function} options.resolve - The function to resolve the incoming event.
 * @returns {Promise<Object>} - A promise that resolves with the updated event object.
 */
export const handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (!userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		userid = crypto.randomUUID();
		event.cookies.set('userid', userid, { path: '/' });
	}

	event.locals.userid = userid;

	return resolve(event);
};
