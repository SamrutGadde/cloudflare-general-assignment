import React from 'react';
import OrgChart from '@unicef/react-org-chart'

export default function OrgView() {
  const [tree, setTree] = React.useState({});

  React.useEffect(() => {
    fetch('/organization-chart')
      .then(response => response.json())
      .then(data => {
        setTree(data);
      });
  });

  return (
    <div className="App">
      <OrgChart
        tree={tree}
        lineType={'angle'}
      />
    </div>
  );
}