from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["timetable_db"]
timetable = db["timetable"] 
@app.route("/")
def dashboard():
    data = list(timetable.find())
    return render_template("dashboard.html", timetable=data)

# ✅ ADD CLASS
@app.route("/add-class", methods=["POST"])
def add_class():
    data = request.json
    timetable.insert_one({
        "day": data["day"],
        "time": data["time"],
        "course": data["course"]
    })
    return jsonify({"success": True})

# ✅ EDIT CLASS
@app.route("/edit-class/<id>", methods=["PUT"])
def edit_class(id):
    data = request.json
    timetable.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "day": data["day"],
            "time": data["time"],
            "course": data["course"]
        }}
    )
    return jsonify({"success": True})

# ✅ DELETE CLASS
@app.route("/delete-class/<id>", methods=["DELETE"])
def delete_class(id):
    timetable.delete_one({"_id": ObjectId(id)})
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)
