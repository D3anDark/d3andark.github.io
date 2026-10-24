// One shared IntersectionObserver for every watched element on the page.
const callbacks = new WeakMap();
let observer;

const get = () =>
	(observer ??= new IntersectionObserver(
		(entries) => {
			for (const e of entries) callbacks.get(e.target)?.(e.isIntersecting);
		},
		{ rootMargin: '0px 0px -12% 0px' }
	));

/** Attachment factory: calls cb(true/false) as the element enters and leaves the viewport. */
export const inview = (cb) => (node) => {
	callbacks.set(node, cb);
	get().observe(node);
	return () => {
		get().unobserve(node);
		callbacks.delete(node);
	};
};

/** Attachment: adds .in the first time the element is seen. */
export const reveal = (node) =>
	inview((seen) => {
		if (!seen) return;
		node.classList.add('in');
		get().unobserve(node);
	})(node);
