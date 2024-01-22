Belly-Button-Challange
Matthew Idle

Matthew Idle
University of Minnesota Data Analytics and Visualization Bootcamp 2023-2024

******I attempted the bonus gauge display, but could not complete it. However I did leave it in to show that I atleast tried.

This project was completed using javascript and plotly. The first portion of the apps.js are chart/plot functions. They work in a similiar
manner, so I will just give the top down view, and add details as needed. They accept arguments listed as either samples, or metadeta, but
which will be discussed later. From there the .find method is used to search for the unique value of each object. Tne kicker was that the ID
for for the names array was a string. So, for the createDemoTable function, the array element value had to be converted to an integer in
order to work. Once the unique ID is found, the function maps the values to a variable. Then the data is accessed using the object.propery format
except in createBarChart, where the y labels use otuIdTop10.map(id => `OTU ${id}`,because accessing the labels using the object.property format, without
mapping, would give us the wrong values as they would not have been sorted. For clarity and readability, when declaring variables, CONST was
used instead of LET, so that you can easily tell which values are oing to change. Plotly was used to create the plots, with the exception of createDemoTable.
CreateDemoTable was done differently, and is displayed using normal HTML. In the createDemoTable, an output element variable was assigned by using the
ass a loop was created to cycle through the properties in the table object to HTML format them, then the getElementById method was used to assign it the value
given in the index.html file, which is, "sample-metadata. An empty string is created, then a for loop is called to loop through the table properties and to format them in HTML. Lastly the .innerhtml method takes the html content created, and formats it again so that it can be displayed. The last function, optionChanged, refreshes the plots/data when the dropdown display changed. Next is the main program, selectedValue is intialized first as 940, this allows us to view the first value in the drop down when the page is first loaded, without this, the value fields on the page will be empty since the plot/tables only change when the drop down menus changes. rawData is declared next as a global variable to allow rawData to be accessed everywhere. the next section begins with d3.json(ewwwRl) reading in ewwwrl which is set to the URL that contains the reference dataset. Next the .foreach method loop is used populate the drop down menu with the values found in rawData.names. The next section is used to call the charts when the page is first loaded.


References and Citations
Not Listed, Author. “JavaScript (JS) Cheat Sheet Online.” JavaScript (JS) Cheat Sheet Online, htmlcheatsheet.com/js/. Accessed 17 Jan. 2024.
Technologies Inc, Plotly. “Plotly.” Plotly Javascript Graphing Library in JavaScript, plotly.com/javascript/. Accessed 17 Jan. 2024. 
OpenAI. (2024). ChatGPT (January 17 version) [Large language model]. https://chat.openai.com/chat# belly-button-challenge