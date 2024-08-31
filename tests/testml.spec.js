const { test } = require('@playwright/test');

/*
1) Enter the website  
2) Select México as a country  
3) Search for the term “playstation 5”  
4) Filter by condition “Nuevos”  
5) Filter by location “Cdmx”  
6) Order by “mayor a “menor precio”  
7) Obtain the name and the price of the first 5 products   
8) Print these products in the console  
*/

test('test1', async({page}) => {
  //1) Enter the website  
  await page.goto("https://www.mercadolibre.com")

  //2) Select México as a country  
  await page.getByRole('link', {name: "México"}).click();

  //3) Search for the term “playstation 5”  
  await page.getByRole('combobox', {name: "Ingresa lo que quieras encontrar"}).fill('playstation 5')
  await page.getByRole('button', {name: "Buscar"}).click()

  //4) Filter by condition “Nuevos”  
  await page.getByRole('link', { name: /^Nuevo, \d+ resultados$/ }).click();

  //5) Filter by location “Cdmx”  
  await page.getByRole('link', { name: /^Distrito Federal, \d+ resultados$/ }).click();

  //6) Order by “mayor a “menor precio”  
  await page.getByRole('button', { name: "Más relevantes Más relevantes"}).click()
  await page.getByRole('option', { name: "Mayor precio"}).click()

  //7) Obtain the name and the price of the first 5 products   
  const products = await page.$$eval('ol.ui-search-layout.ui-search-layout--stack.shops__layout > li.ui-search-layout__item.shops__layout-item.ui-search-layout__stack', items => 
    items.slice(0, 5).map(item => ({
        name: item.querySelector('h2.ui-search-item__title').innerText,
        price: item.querySelector('span.andes-money-amount').innerText.replace(/\s+/g, ''),
    }))
);
//8) Print these products in the console 
console.log('Top 5 Products:');
products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - $${product.price}`);
});
})

