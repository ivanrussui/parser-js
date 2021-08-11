// чтобы дождаться что все ДОМ узлы готовы
window.addEventListener('DOMContentLoaded', () => { 
	const body = document.querySelector('body');
	let textNodes = [];
	
	// пишем рекурсию
	function recursy(element) {
		// необходимо показать те дочерние теги которые входят в body
		element.childNodes.forEach(node => { // childNodes это все потомки

			if (node.nodeName.match(/^H\d/)) {
				// формируем JSON объект
				const obj = {
					header: node.nodeName,
					content: node.textContent
				};
				textNodes.push(obj);
			} else {
				recursy(node);
			}
		});
	}
	recursy(body);

	// отправляем obj
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			"Content-type": 'application/json'
		},
		body: JSON.stringify(textNodes)
	})
	.then(response => response.json())
	.then(json => console.log(json));
});