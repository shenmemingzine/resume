var vocabs = ["Python", "MatLab", "SQL", "LaTeX", "Microsoft Office", "HTML",
							"CSS", "JavaScript", "Keras", "PyTorch", "Matplotlib", "Seaborn",
              "Plotly", "Beautiful Soup", "Machine Learning", "Statistics", 
              "Applied Mathematics", "Natural Language Processing"];
              
var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 450 - margin.left - margin.right;
var height = 250 - margin.top - margin.bottom;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#word-cloud")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("rect")
//    .attr("width", "100%")
//    .attr("height", "100%")
//    .attr("fill", "white");
   
var layout = d3.layout.cloud()
               .size([width, height])
               .words(vocabs.map(function(d) { return {text: d, size: 15+Math.random()*(vocabs.length+1)}; }))
               .padding(0)
               .rotate(function() { return ~~(Math.random()*2)*45; })
               .font("Impact")
               .fontSize(function(d) { return d.size; })
               .on("end", draw);

layout.start();

function draw(words) {
    svg.append("g")
       .attr("transform", "translate(" + layout.size()[0]/2 + "," + layout.size()[1]/2 + ")")
       .selectAll("text")
       .data(words)
       .enter()
       .append("text")
       .style("font-size", function(d) { return d.size + "px"; })
       .style("fill", function(d, i) { return color(i); })
       .attr("text-anchor", "middle")
       .style("font-family", "Impact")
       .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
       .text(function(d) { return d.text; });
};
