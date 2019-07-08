import sql from 'mssql'
import { config } from '../config'

let db_config = config.database

export const getDefendList = () => {
    return new sql.ConnectionPool(db_config.mssql).connect().then(pool => { return pool.request().execute("sp_PCIS_RequestDefend_Schedule") })
}

export const setDefendLogs = () => {
    return new sql.ConnectionPool(db_config.mssql).connect().then(pool => { return pool.request().execute("sp_PCIS_RequestDefend_Schedule_InsertLog") })
}