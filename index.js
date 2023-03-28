/*

const { clear } = require('console');


const fs = require('fs');
const http = require('http');
const { join } = require('path');
const url = require('url');

const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');




//////////////////////////////
//File



//Blocking synchronous way
// const textIn = fs.readFileSync('./text/input.txt', 'utf-8');
// console.log(textIn);


// const textOut = `learning node.js: ${textIn}.\n Created on${Date.now()}`;
// fs.writeFileSync('./text/output.txt', textOut);

// console.log("File written!");

// const hello = "Learning node";
// console.log(hello);



//NON - Blocking Asynchnorous way

// fs.readFile('./text/start.txt', 'utf-8', (err, Data1) => {
//     if (err) return console.log('Error occur!')

//     fs.readFile(`./text/${Data1}.txt`, 'utf-8', (err, Data2) => {
//         console.log(Data2);

//         fs.readFile('./text/input.txt', 'utf-8', (err, Data3) => {
//             console.log(Data3);


//             fs.writeFile('./text/final.txt', `${Data2}\n${Data3}`, 'utf-8', err => {
//                 console.log('your file hase been written!');
//             })
//         });
//     });
// });
// console.log('working here!');







/////////////////////////////////
//Server


// const replaceTemplate = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);
    
//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
//   }

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempcard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const DataObj = JSON.parse(Data);

const slugs = DataObj.map(el => slugify(el.productName, {lower: true}));

console.log(slugs);

const server = http.createServer((req, res) => {
    
    
    const {query, path} = url.parse(req.url, true);

    // const path = req.url;


    //overview page
    if (path === '/' || path === '/overview') {
        // console.log('This is overview')

        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = DataObj.map(el => replaceTemplate(tempcard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        // console.log(cardsHtml)

        res.end(output);
    }

    //product page
    else if (path === '/product') {
        // console.log(query);
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = DataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    }


    //API
    else if (path === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(Data);
    }


    //error page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!!</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to server at port 8000: ')
})



*/

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

/////////////////////////////////
// SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// /home/jaydeepvaghela/Node/Node_Farm/templates/template-card.html
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
