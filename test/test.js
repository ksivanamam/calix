var list = [{
		name: 'a',
		age: 1,
	},
	{

	}
]
keysMap = {
	name: 'firstName',
	job: 'passion',
	organization: 'department'
}

obj = {
	name: 'Bobo',
	job: 'Front-End Master',
	organization: 'IT'
}

renameKeys = (keysMap, obj) => {

	return Object.keys(obj).reduce((acc, key) => {

		var renamedObject = {
			[keysMap[key] || key]: obj[key]
		};

		return {
			...acc,
			...renamedObject
		};

	}, {});
};

renameKeys(keysMap, obj);

var items = [{
		exercise_name: 'pullup',
		exercise_type: 'strength',
		exercise_engagement: 'lats'
	},
	{
		exercise_name: 'pushup',
		exercise_type: 'strength',
		exercise_engagement: 'triceps'
	}
]
var exercises = []
items.forEach(object => {
	Object.keys(object).forEach(key => {
		console.log(key.substr(9));
	});
	exercises.push(object)
});