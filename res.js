'use strict'

exports.ok = function(values, res) {
    var data = {
        'status' : 200,
        'values' :values
    };

     res.json(data);
     res.end();
}


exports.matakuliah = function(values,res){
    const hasil = values.reduce((req,item) => {
        if(req[item.nama]){
            const group = req[item.nama];

            if(Array.isArray(group.matakuliah)){
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        }else{
            req[item.nama] = item
        }

        return req;
    },{});

    var data = {
        'status' : 200,
        'values' :values
    };

     res.json(data);
     res.end();
}
