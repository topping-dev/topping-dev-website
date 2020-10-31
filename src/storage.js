const OS_DATA = "os_data";
const LANG_DATA = "lang_data";

function removeSessionStorage(param)
{
    window.sessionStorage.removeItem(param);
}

function setSessionStorage(param, val) 
{
    if(val == undefined || val == null)
    {
        removeSessionStorage(param);
        return;
    }
    var objStore = {};
    objStore.type = typeof(val);
    objStore.obj = val;
    window.sessionStorage.setItem(param, JSON.stringify(objStore));
}

function getSessionStorage(param) {
    var objStoreStr = window.sessionStorage.getItem(param);
    if(objStoreStr == undefined)
        return objStoreStr;
    var objStore = undefined;
    try
    {
        objStore = JSON.parse(objStoreStr);
        if(objStore.type == undefined)
            return undefined;
    }
    catch(err)
    {
        return undefined;
    }
    return objStore.obj;
}

function getObject(succ, datapath)
{
    var user = getSessionStorage(datapath);
    succ(user);
}

function setObject(val, succ, err, datapath)
{
    setSessionStorage(datapath, val);
    succ();
}

function getOs(succ)
{
    getObject(succ, OS_DATA);
}

function setOs(val, succ, err) 
{
    setObject(val, succ, err, OS_DATA);
}

function getLang(succ)
{
    getObject(succ, LANG_DATA);
}

function setLang(val, succ, err) 
{
    setObject(val, succ, err, LANG_DATA);
}

export default {
    name: 'Storage',
    
    OS_DATA : OS_DATA,
    LANG_DATA : LANG_DATA,

    removeSessionStorage,
    getSessionStorage,
    setSessionStorage,
    getOs,
    setOs,
    getLang,
    setLang
}