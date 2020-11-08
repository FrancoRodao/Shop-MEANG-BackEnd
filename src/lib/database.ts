import mongose from "mongoose"


class DataBase{
    async init(){
        try{
            const URI = process.env.DATABASE || ''
            const db = await mongose.connect(URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                })


            console.log("Database: online")
            return db.connection

        }catch(e){
            console.log("ERROR AL CONECTARSE A LA BASE DE DATOS")
            console.log('ERROR:', e.message)
            return e
        }
    }
}

export default DataBase