const parseCSVtoJSON = (csv) => {
	const lines = csv.split('\n');
	const headers = lines[0].split(',');
	let departments = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].split(',');
		const name = line[0];
		const department = line[1];
		const salary = line[2];
		const office = line[3];
		const isManager = line[4];
		const skill1 = line[5];
		const skill2 = line[6];
		const skill3 = line[7];
		let employee = {
			name,
			department,
			salary,
			office,
			isManager,
			skills: [skill1, skill2, skill3]
		}

		for (let j = 0; j < departments.length; j++) {
			if (departments[j].name === department) {
				departments[j].employees.push(employee);
				if (isManager) {
					departments[j].managerName = name;
				}
				break;
			}
		}

		departments.push({
			name: department,
			managerName: isManager ? name : null,
			employees: [employee]
		})
	}

	return {
		organization: {
			departments
		}
	}

}

export async function onRequest(context) {
  const csv = await context.env.ASSIGNMENT_KV.get("organization-chart-csv");
  console.log(csv);
  const parsedJSON = csv ? parseCSVtoJSON(csv) : {organization: "null"};
  return new Response(JSON.stringify(parsedJSON))
}