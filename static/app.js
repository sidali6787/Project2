d3.json('/api/v1.0/restaurantes').then(data => {

    showData(data);
    d3.selectAll('input').on('change', handleChange);
    d3.select('button').on('click', handleClick);

    var filteredData = data;

    test = data;

    function showData(data) {
        d3.select('tbody').html('');
        data.forEach(obj => {
            var row = d3.select('tbody').append('tr');
            row.append('td').text(obj.Restaurant)
            row.append('td').text(obj.City)
            row.append('td').text(obj.State)
            row.append('td').text(obj['Meals Served'])
            row.append('td').text(obj.Sales)
            row.append('td').text(obj['Average Check'])
        });

        var checkChart = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: d3.mean(data.map(obj=>obj['Average Check'])),
                title: { text: "Average Check" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [0, d3.max(data.map(obj=>obj['Average Check']))] } }
            }
        ];
        
        var checkLayout = { margin: {t:75,b:25,l:0,r:0} };
        Plotly.newPlot('check', checkChart, checkLayout);
        
        var salesChart = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: d3.mean(data.map(obj=>obj.Sales)),
                title: { text: "Average Sales" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [0, d3.max(data.map(obj=>obj.Sales))] } }
            }
        ];
        
        var salesLayout = { margin: {t:75,b:25,l:0,r:0} };
        Plotly.newPlot('sales', salesChart, salesLayout);
        
        var mealChart = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: d3.mean(data.map(obj=>obj['Meals Served'])),
                title: { text: "Total Meals" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [0, d3.max(data.map(obj=>obj['Meals Served']))] } }
            }
        ];
        
        var mealsLayout = { margin: {t:75,b:25,l:0,r:0} };
        Plotly.newPlot('meals', mealChart, mealsLayout);
    

    };

    function handleChange() {
        var key = d3.select(this).property('id');
        var val = d3.select(this).property('value');

        filteredData = filteredData.filter(obj => obj[key] == val);
        showData(filteredData);
    };

    function handleClick() {
        filteredData = data;
        d3.selectAll('input').property('value', '');
        showData(filteredData);
    }


   




})