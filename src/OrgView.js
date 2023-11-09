import {useEffect, useState} from 'react';
import './App.css';
import { OrgChartComponent } from './OrgChart';

function parseToDatasource(data) {
  let id = 0;
  let datasource = [{
    name: "Cloudflare!",
    id: id++,
    parentId: null,
  }]
  const { departments } = data.organization;
  for (let i = 0; i < departments.length; i++) {
    let department = {
      id: i + 1,
      parentId: 0,
      name: departments[i].name,
      managerName: departments[i].managerName,
      employees: departments[i].employees.length,
    }
    id++;

    for (let j = 0; j < departments[i].employees.length; j++) {
      let employee = {
        id: j + departments.length + id++,
        parentId: i + 1,
        name: departments[i].employees[j].name,
        department: departments[i].employees[j].department,
        salary: departments[i].employees[j].salary,
        office: departments[i].employees[j].office,
        isManager: departments[i].employees[j].isManager,
        skills: departments[i].employees[j].skills,
      }
      datasource.push(employee)
    }

    datasource.push(department)
  }

  return datasource;
}

export default function OrgView() {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.CF_PAGES_URL}/organization-chart`)
      .then(response => response.json())
      .then(data => {
        setData(parseToDatasource(data));
      })
  }, [])

  return (
    <div>
      <OrgChartComponent
        data={data}
      />
    </div>
  );
}