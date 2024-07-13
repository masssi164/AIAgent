import jsYaml from "js-yaml";
import {readFile} from "fs"

export const getJsonSpec= async (fileName:string,callback:(err?:Error,yaml?:unknown | null) => void ) => {
    try {
        readFile(fileName,"utf-8",async (err,data) => {
            if(err) {
                throw err
            }
            if(data && data.length > 0) {
                callback(undefined,jsYaml.load(data))
            }
        })
    } catch(err) {
        console.error(err)
        callback(err as Error)
    }
}