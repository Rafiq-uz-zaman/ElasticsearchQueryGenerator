def generate_query(data):
    query = {
        "size": data.get("size", 10),
        "_source": data.get("fields", []),
        "query": {
            "bool": {
                "must": data.get("must", []),
                "filter": data.get("filter", []),
                "should": data.get("should", []),
                "must_not": data.get("must_not", [])
            }
        }
    }
    return query
