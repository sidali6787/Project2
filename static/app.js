d3.json('/api/v1.0/restaurantes').then(data => {
    console.log(data);

    showData(data);
    d3.selectAll('input').on('change', handleChange);

    var filteredData = data;


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
    };

    function handleChange() {
        var key = d3.select(this).property('id');
        var val = d3.select(this).property('value');

        filteredData = filteredData.filter(obj => obj[key] == val);
        showData(filteredData);
    };

})
