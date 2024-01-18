// Declare rawData as a global variable makes it accessible everywhere, using, "let", instead of  
//the d3.json(ewwwrl) section allows values to be assigned to it
let rawData; 
//initializes selectedValue to equal the first element of the array used in the dropdown
//using, "let", instead of, "const", allows the value to be changed
let selectedValue = "940";
// Get the Roadster endpoint
const ewwwRl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

//this section is used to access the json objects at ewwwrl, it then sets rawData equal to the array of objects,
//which will be used as a data source for the plot functions further down 
d3.json(ewwwRl) 
  .then(data => {
    rawData = data; // Assign the fetched data to the global rawData variable
    const names = rawData.names;

    // Used a loop to append the selectElement array which displays values from the, "names",
    const selectElement = d3.select("#selDataset");
    names.forEach(value => {
      selectElement
        .append("option")
        .attr("value", value)
        .text(value);
    });

    //this calls the chart functions when the page is first loaded
    createBarChart(rawData.samples, selectedValue);
    createBubbleChart(rawData.samples, selectedValue);
    createDemoTable(rawData.metadata, selectedValue);
  });

function createBarChart(samples, selectedValue) {
  // Find the sample with the matching id
  let sampleId = samples.find(sample => sample.id === selectedValue);
    
  // Retrieve otu_ids and sample_values from the found sample
  const otuIdTop10 = sampleId.otu_ids.slice(0, 10).reverse();;
  const sampleValuesTop10 = sampleId.sample_values.slice(0, 10).reverse();;
  const otuLabelsTop10 = sampleId.otu_labels.slice(0, 10);

  // Create a trace for the bar chart
  const trace = {
    x: sampleValuesTop10,
    y: otuIdTop10.map(id => `OTU ${id}`), // Format otu_ids as "OTU {id}"
    text: otuLabelsTop10, // Use otu_labels for hover text
    type: "bar",
    orientation: "h",
  };
  
  const data = [trace]
  // Return the data object
  Plotly.newPlot("bar", data);
}

function createBubbleChart(samples, selectedValue) {
  // Find the sample with the matching id
  const sampleId = samples.find(sample => sample.id === selectedValue);
  const otuId = sampleId.otu_ids;
  const sampleValues = sampleId.sample_values;
  const otuLabels = sampleId.otu_labels;

  // Create a trace for the bubble chart
  const trace = {
    x: otuId,            // Assign otu_ids to the x-axis
    y: sampleValues,     // Assign sample_values to the y-axis
    text: otuLabels,     // Use otu_labels for hover text
    mode: "markers",
    marker: {
      size: sampleValues, // Set the marker size based on sampleValues
      color: otuId,       // Set the marker color based on otuId
      colorscale: "Earth", // You can choose different color scales
      colorbar: {
        title: "OTU ID",  // Label for the color bar
      },
    },
  };

  const data = [trace];

  // Define the layout for the bubble chart
  const layout = {
    xaxis: { title: "OTU ID" }, // Label for the x-axis
    yaxis: { title: "Sample Values" }, // Label for the y-axis
    showlegend: false, // Hide the legend
    hovermode: "closest", // Display hover info for closest point
  };

  // Create the bubble chart
  Plotly.newPlot("bubble", data, layout);
}

function createDemoTable(metadata, selectedValue) {
  //selectedValue has been defined as a string, in order to search for the object id, it must be an integer
  const selectedValueInt = parseInt(selectedValue);  
  let data = metadata.find(item => item.id === selectedValueInt);

  // Create an object to hold the table data
  const tableData = {
    id: `id: ${data.id}`,
    ethnicity: `ethnicity: ${data.ethnicity}`,
    gender: `gender: ${data.gender}`,
    age: `age: ${data.age}`,
    location: `location: ${data.location}`,
    bbtype: `bbtype: ${data.bbtype}`,
    wfreq: `wfreq: ${data.wfreq}`
  };
  console.log("Fetched metadata:", metadata);
  console.log("Selected data:", data);
  // Get the HTML element by its ID
  const outputElement = document.getElementById("sample-metadata");

  // Initialize an empty string to hold the HTML content
  let htmlContent = "";

  // Iterate through the properties of tableData and build the HTML content
  for (const property in tableData) {
    htmlContent += `<p>${tableData[property]}</p>`;
  }

  // Set the innerHTML of the outputElement to the generated HTML content
  outputElement.innerHTML = htmlContent;
}

 //this function detects when the value in the dropdown box has changed, then calls the 
 //chart/plot functions
function optionChanged(selectedValue) {
  // The 'selectedValue' parameter will contain the value of the selected option
  console.log("Selected value:", selectedValue);

  // Call the barData function with the necessary data and store the result
  createBarChart(rawData.samples, selectedValue);
  createBubbleChart(rawData.samples, selectedValue);
  createDemoTable(rawData.metadata, selectedValue);
  //createWashPlot(rawdata.metadata, selectedValue);
}
