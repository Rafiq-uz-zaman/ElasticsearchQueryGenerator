from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch
from queries import generate_query

app = Flask(__name__)
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

@app.route('/generate_query', methods=['POST'])
def generate_query_route():
    try:
        data = request.json
        query = generate_query(data)
        return jsonify(query), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/execute_query', methods=['POST'])
def execute_query():
    try:
        index_name = request.json.get('index_name')
        query = request.json.get('query')
        response = es.search(index=index_name, body=query)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
