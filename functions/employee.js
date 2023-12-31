export async function onRequest(context) {
  const jsonStr = await context.env.ASSIGNMENT_KV.get("organization-chart-json");
  const organization = JSON.parse(jsonStr).organization;
  let clonedBody = await context.request.clone().json()
  let name = clonedBody.name
  let department = clonedBody.department
  let minSalary = clonedBody.minSalary
  let maxSalary = clonedBody.maxSalary
  let office = clonedBody.office
  let skill = clonedBody.skill

  let filteredEmployees = []

  for (let i = 0; i < organization.departments.length; i++) {
    filteredEmployees = filteredEmployees.concat(organization.departments[i].employees)
  }

  if (department) {
    filteredEmployees = filteredEmployees.filter(employee => employee.department === department)
  }

  if (minSalary) {
    filteredEmployees = filteredEmployees.filter(employee => employee.salary >= minSalary)
  }

  if (maxSalary) {
    filteredEmployees = filteredEmployees.filter(employee => employee.salary <= maxSalary)
  }

  if (office) {
    filteredEmployees = filteredEmployees.filter(employee => employee.office === office)
  }

  if (skill) {
    filteredEmployees = filteredEmployees.filter(employee => employee.skills.includes(skill))
  }

  if (name) {
    filteredEmployees = filteredEmployees.filter(employee => employee.name === name)
  }

  return new Response(JSON.stringify({employees: filteredEmployees}))
}