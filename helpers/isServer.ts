/**
 * It returns true if the code is running on the server, and false if it is running on the client.
 * @returns `true` if the code is running on the server, `false` if the code is running on the client.
 */
export default function isServer(): boolean {
	return typeof window === 'undefined';
}
