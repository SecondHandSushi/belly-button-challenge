
function createBarChart(samples, selectedValue) {
  // Find the sample with the matching id
  let sampleId = samples.find(sample => sample.id === selectedValue);
  // Retrieve otu_ids and sample_values from the found sample, slices them to get the first 10 values
  //then reverses the order to give us the top 10 samples by abundance
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
  const layout = {
    title: "Top 10 Bacteria Species",
    xaxis: { title: "Abundance" }, 
    yaxis: { title: "Bacteria Sample ID" }, 
    showlegend: false, // Hide the legend
    hovermode: "closest", // Display hover info for closest point
    margin: {
      t: 30,
      b: 40,
      l: 100,
    }
  };
  const data = [trace]
  Plotly.newPlot("bar", data, layout);
}

function createBubbleChart(samples, selectedValue) {
  // Find the sample with the matching id
  const sampleId = samples.find(sample => sample.id === selectedValue);
  // Create a trace for the bubble chart
  const trace = {
    x: sampleId.otu_ids,            // Assign otu_ids to the x-axis
    y: sampleId.sample_values,     // Assign sample_values to the y-axis
    text: sampleId.otu_labels,     // Use otu_labels for hover text
    mode: "markers",
    marker: {
      size: sampleId.sample_values, // marker size based on sampleValuessampleValues
      color: sampleId.otu_ids,       // marker color based on otuId
      colorscale: "Earth", // You can choose different color scales
      colorbar: {
        title: "OTU ID",  // Label for the color bar
      },
    },
  };
  const data = [trace];
  // Define the layout for the bubble chart
  const layout = {
    xaxis: { title: "OTU ID" }, 
    yaxis: { title: "Bacteria Sample ID"},
    showlegend: false, // Hide the legend
    hovermode: "closest", // Display hover info for closest point
  };
  // Create the bubble chart
  Plotly.newPlot("bubble", data, layout);
}
//this function creates the demographic html table
function createDemoTable(metadata, selectedValue) {
  //selectedValue has been defined as a string, in order to search for the object id, it must be an integer
  const selectedValueInt = parseInt(selectedValue);  
  let data = metadata.find(item => item.id === selectedValueInt);
  // Create an object to hold the table data
  const table = {
    id: `id: ${data.id}`,
    ethnicity: `ethnicity: ${data.ethnicity}`,
    gender: `gender: ${data.gender}`,
    age: `age: ${data.age}`,
    location: `location: ${data.location}`,
    bbtype: `bbtype: ${data.bbtype}`,
    wfreq: `wfreq: ${data.wfreq}`
  };
  // Get the HTML element by its ID
  const outputElement = document.getElementById("sample-metadata");
  // Initialize an empty string to hold the HTML content
  let htmlContent = "";
  // Iterate through the properties of tableData and build the HTML content
  for (const property in table) {
    htmlContent += `<p>${table[property]}</p>`;
    }
  // Set the innerHTML of the outputElement to the generated HTML content
  outputElement.innerHTML = htmlContent;
}
//this gauge was attempted, but I threw in the towel
function createGauge(metadata, selectedValue) {
  //selectedValue has been defined as a string, in order to search for the object id, it must be an integer
  const selectedValueInt = parseInt(selectedValue);  
  const data = metadata.find(item => item.id === selectedValueInt);
  const trace = [{
    domain: {x: [0, 1], y: [0, 1] },
    value: data.wfreq,
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis:
      { range: [0, 9]}
    },
    }
  ];
  const layout = {
    width: 600,
    height: 400,
    title: {
      text:
        "Belly Button Wash Frequency<br><span style='font-size:0.8em;color:gray'><span style='font-size:0.8em;color:gray'>Washes per week</span><br>"
    },
  };
  Plotly.newPlot('gauge', trace, layout);
  }

function optionChanged(selectedValue) {
   //this function detects when the value in the dropdown box has changed, then calls the chart/plot function
  createBarChart(rawData.samples, selectedValue);
  createBubbleChart(rawData.samples, selectedValue);
  createDemoTable(rawData.metadata, selectedValue);
  createGauge(rawData.metadata, selectedValue);
}

// Declare rawData as a global variable makes it accessible everywhere, using, "let", instead of  
//the d3.json(ewwwrl) section allows values to be assigned to it
let rawData; 
//initializes selectedValue to equal the first element of the array used in the dropdown
//using, "let", instead of, "const", allows the value to be changed
let selectedValue = "940";
//belly button bacteria is gross, so instead of declaring the URL as URL =
//I used ewwwRl to inject humor in the hearts and minds of anybody that
//has to read this
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
    //this calls the chart functions, with the default selectedValue, when the page is first loaded
    createBarChart(rawData.samples, selectedValue);
    createBubbleChart(rawData.samples, selectedValue);
    createDemoTable(rawData.metadata, selectedValue);
    createGauge(rawData.metadata, selectedValue);
  });


