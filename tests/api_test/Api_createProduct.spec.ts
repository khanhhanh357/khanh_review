import { test, expect } from '@playwright/test';
require('dotenv').config()
const Base_Domain= process.env.BASE_DOMAIN!;
const Base_Token=process.env.BASE_TOKEN!;
test(' API testing để thêm mới 1 sản phẩm',async({request})=>{
   
    const test_port=await request.post(`${Base_Domain}`,{
        headers: {
            
            // Add GitHub personal access token.
            'X-ShopBase-Access-Token': `${Base_Token}`,
          },   
    
    data:{
            product:{
            body_html:"<p>It's the small iPod with a big idea: Video.<p>",
            title:"test_khanh5",
        
            variants:[{
                price:200
            }
            ]
        }
    }
    })
    expect(test_port.ok()).toBeTruthy();

    
})

test.only('kiểm tra xem title đúng như đã setup không',async({request})=>{
    const check_Product=await request.get(`${Base_Domain}`,{
        headers: {
            
            // Add GitHub personal access token.
            'X-ShopBase-Access-Token': `${Base_Token}`,
          },  
    })
    expect(check_Product.ok).toBeTruthy();
 
    const bodyText = JSON.stringify(await check_Product.json())
    await expect(bodyText).toContain('"title":"test_khanh5"')
})

