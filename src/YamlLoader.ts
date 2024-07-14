import jsYaml from "js-yaml"; "js-yaml";
import {readFile} from "fs/promises"
import { JsonObject } from "langchain/tools";

export const getJsonSpec= async (fileName:string):Promise<JsonObject>  => {
    try {
        const fileContent = await readFile(fileName,"utf-8")
        const jsonYaml = jsYaml.load(fileContent) as JsonObject
        if(!jsonYaml) throw new Error("yaml not converted to JsonObject")
        return jsonYaml
    } catch(err) {
        console.error(err)
        throw err as Error
    }
}