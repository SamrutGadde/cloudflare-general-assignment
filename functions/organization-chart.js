const parseCSVtoJSON = (csv) => {
	const lines = csv.split('\n');
	let departments = []

	for (let i = 1; i < lines.length; i++) {
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

		let added = false;
		for (let j = 0; j < departments.length; j++) {
			if (departments[j].name === department) {
				departments[j].employees.push(employee);
				if (isManager === "TRUE") {
					departments[j].managerName = name;
				}
				added = true;
				break;
			}
		}
		
		if (!added) {
			departments.push({
				name: department,
				managerName: isManager === "TRUE" ? name : null,
				employees: [employee]
			})
		}

	}

	return {
		organization: {
			departments
		}
	}

}

export async function onRequestGet(context) {
	const json = await context.env.ASSIGNMENT_KV.get("organization-chart-json");
	if (json) {
		return new Response(json)
	}
	const csv = await context.env.ASSIGNMENT_KV.get("organization-chart-csv");
  const parsedJSON = csv ? parseCSVtoJSON(csv) : {organization: "null"};
  await context.env.ASSIGNMENT_KV.put("organization-chart-json", JSON.stringify(parsedJSON));
  return new Response(JSON.stringify(parsedJSON))
}

export async function onRequestPost(context) {
  let clonedBody = await context.request.clone().json()
  let csv = clonedBody.organizationData
  const parsedJSON = csv ? parseCSVtoJSON(csv) : {organization: "null"}
  return new Response(JSON.stringify(parsedJSON))
}