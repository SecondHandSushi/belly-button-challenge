// Get the Roadster endpoint
const ewwwRl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(ewwwRl)
  .then(data => {
    let rawData = data;
    //console.log(rawData);
    let metaData = rawData.metadata;
    console.log(metaData);
    let namesArray = rawData.names;
    console.log(namesArray);
    let samplesArray = rawData.samples;
    console.log(samplesArray);

    // Use a loop to create and append options to the select element
    const selectElement = d3.select("#selDataset");
    namesArray.forEach(value => {
      selectElement
        .append("option")
        .attr("value", value)
        .text(value);
    });

    // You can perform further logic or operations with these variables here
  });

function optionChanged(selectedValue) {
  // The 'selectedValue' parameter will contain the value of the selected option
  console.log("Selected value:", selectedValue);
  // You can perform further actions based on the selected value here
}
