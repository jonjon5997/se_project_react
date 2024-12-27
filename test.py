url = "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Skirt.png?etag=27a6bea7e1b63218820d615876fa31d1"

import json
file_path = "/Users/jonathansanfilippo/projects/se_project_react/db.json"

with open(file_path) as f:
    text = f.read()
    j = json.loads(text)

for item in j["items"]:
    print(item["name"])