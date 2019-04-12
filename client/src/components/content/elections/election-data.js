let counter = 0;

function createData(name, status, action) {
  counter += 1;
  return { id: counter, name, status, action };
}

export default [
  createData("CAS 2019", "Pending", "Edit, Delete"),
  createData("CAMP 2019", "Ongoing", "View"),
  createData("CN 2019", "Ongoing", "View"),
  createData("CM 2019", "Ongoing", "View"),
  createData("CAS 2018", "Finished", "View"),
  createData("CAMP 2018", "Finished", "View"),
  createData("CN 2018", "Finished", "View"),
  createData("CM 2018", "Finished", "View"),
  createData("CAS 2017", "Finished", "View"),
  createData("CAMP 2017", "Finished", "View"),
  createData("CD 2017", "Finished", "View"),
]