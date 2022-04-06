/**
 * If condition is true, return wrapper(children); otherwise, return children
 * @param  - condition: A boolean value that determines whether or not the wrapper is applied.
 */
const ConditionalWrapper = ({ condition, wrapper, children }: { condition: boolean; wrapper: any; children: any }) =>
	condition ? wrapper(children) : children;
export default ConditionalWrapper;
