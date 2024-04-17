routerAdd("POST", "/ai", (c) => {

	const ollama = (question) => {
		const res = $http.send({
			url: "http://localhost:11434/api/chat",
			method: "POST",
			body: JSON.stringify({
				model: 'llama2',
				messages: [
					{
						"role": "user",
						"content": question
					}
				],
				stream: false
			}),
		});
		return res.raw
	}

	const data = new DynamicModel({
		prompt: "",
	})
	c.bind(data)
	const res = JSON.parse(ollama(data.prompt)).message.content

	return c.json(200, { "message": res })
})

