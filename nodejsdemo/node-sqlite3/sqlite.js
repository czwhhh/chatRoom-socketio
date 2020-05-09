var fs = require('fs');

var sqlite3 = require('sqlite3').verbose();

var DB = DB || {};

DB.sqliteDB = (file)=>{
    DB.db = new sqlite3.Database(file);
    DB.exist = fs.existsSync(file);

    if(!DB.exist){
        console.log("Creating db file");
        fs.openSync(file,'w');
    }
}
DB.printErrorInfo = (err)=>{
    console.log("Error Message:"+err.message+" ErrorNumber:"+errno);
}
DB.sqliteDB.prototype.createTable = function(sql){
    DB.db.serialize(()=>{
        DB.db.run(sql,(err)=>{
            if(null != err){
                DB.printErrorInfo(err);
                return;
            }
        })
    })
}

DB.sqliteDB.prototype.insertData = (sql,Objects)=>{
    DB.db.serialize(()=>{
        var stmt = DB.db.prepare(sql);
        for(var i=0;i<Objects.length;i++){
            stmt.run(Objects[i]);
        }

        stmt.finalize();
    })
}

DB.sqliteDB.prototype.queryData = (sql,callback)=>{
    DB.db.all(sql,(err,rows)=>{
        if(null != err){
            DB.printErrorInfo(err);
            return;
        }
        if(callback){
            callback(rows);
        }
    })
}

DB.sqliteDB.prototype.executeSql = (sql)=>{
    DB.db.run(sql,(err)=>{
        if(null != err){
            DB.printErrorInfo(err);
        }
    })
}

DB.sqliteDB.prototype.close = ()=>{
    DB.db.close();
}

exports.sqliteDB = DB.sqliteDB;