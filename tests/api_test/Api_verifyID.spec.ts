import { expect, Expect,test } from "@playwright/test";
require('dotenv').config() 

test('Verify xem id có bằng 1000000072213752',async({request})=>{
    const Base_Url= process.env.BASE_URL!;
    const _request= await request.get(`${Base_Url}`)
    await expect(_request.ok()).toBeTruthy();
  

    await expect (await _request.json()).toMatchObject({
        "result": {
                    "id": 1000000072213752,
                }

    })
    
})
