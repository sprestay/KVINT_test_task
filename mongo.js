const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://mongo:27017/";
const mongoClient = new MongoClient(url);

module.exports.find = async function() {
    var data;
    try {
        await mongoClient.connect();
        const db = mongoClient.db("test");
        var res = await db.collection("test_task").find().toArray();
        data = res;
    } catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    } finally {
        await mongoClient.close();
    }
    return data;
}

module.exports.saveToDB = async function(str) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("test");
        await db.collection("test_task").insertOne({string: str});
        console.log("Успешно сохранили " + str);
    } catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
