let query = {
    size: 10,
    _source: [],
    query: {
        bool: {
            must: [],
            filter: [],
            should: [],
            must_not: []
        }
    }
};

function addFieldExists() {
    const field = prompt("Enter field name for 'exists' query:");
    if (field) {
        query.query.bool.must.push({ exists: { field: field } });
        updateQueryPreview();
    }
}

function addMatchPhrase() {
    const field = prompt("Enter field name for 'match_phrase':");
    const value = prompt("Enter phrase to match:");
    if (field && value) {
        query.query.bool.must.push({ match_phrase: { [field]: value } });
        updateQueryPreview();
    }
}

function addAggregation() {
    const aggName = prompt("Enter name for the aggregation:");
    const field = prompt("Enter field name to aggregate:");
    if (aggName && field) {
        query.aggregations = {
            [aggName]: {
                terms: {
                    field: field
                }
            }
        };
        updateQueryPreview();
    }
}

function addSize() {
    const size = prompt("Enter the number of documents to retrieve:");
    if (size) {
        query.size = parseInt(size, 10);
        updateQueryPreview();
    }
}

function updateQueryPreview() {
    const queryBox = document.getElementById('generated-query');
    queryBox.textContent = JSON.stringify(query, null, 2);
}

function executeQuery() {
    const indexName = prompt("Enter index name:");
    if (indexName) {
        fetch('/execute_query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index_name: indexName, query: query }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            alert("An error occurred: " + error.message);
        });
    }
}
