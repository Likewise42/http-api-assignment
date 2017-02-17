const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });

  console.log(type);
  

  if (type === 'text/xml') {
    content = convertJSONtoXML(content, status);
  }else {
    content = JSON.stringify(content);
  } 

  response.write(content);

  response.end();
};

const convertJSONtoXML = (json, status) => {
  let xml = '<response>';
  xml = `${xml} <msg>${json.msg}</msg>`;
  xml = `${xml} <id>${json.id}</id>`;

  xml = `${xml} </response>`;

  console.dir(xml);
  return xml;
};

const getIndex = (request, response) => {
  response.writeHead(200, {'Content-Type':'text/html'});
  
  response.write(index);
  
  response.end();
};
module.exports.getIndex = getIndex;

const getStyle = (request, response) => {
  response.writeHead(200, {'Content-Type':'text/css'});
  
  response.write(style);
  
  response.end();
};
module.exports.getStyle = getStyle;

const success = (request, response, params, type) => {
  const responseJSON = {
    msg: 'This is a successful response',
    id: 'Success',
  };
  respond(request, response, 200, responseJSON, type);
};
module.exports.success = success;

const forbidden = (request, response, params, type) => {
  const responseJSON = {
    msg: 'You dont have access to this content',
    id: 'Forbidden',
  };
  respond(request, response, 403, responseJSON, type);
};
module.exports.forbidden = forbidden;

const internal = (request, response, params, type) => {
  const responseJSON = {
    msg: 'Internal Server Error. Something went wrong.',
    id: 'Internal',
  };
  respond(request, response, 500, responseJSON, type);
};
module.exports.internal = internal;

const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    msg: 'a get request for this page has not been impemented yet. check back later yo.',
    id: 'notImplemented',
  };
  respond(request, response, 501, responseJSON, type);
};
module.exports.notImplemented = notImplemented;

const unauthorized = (request, response, params, type) => {
  if (params.loggedIn && params.loggedIn === "yes") {
    const responseJSON = {
      msg: 'this request has the required params',
      id: 'unauthorized',
    };

    respond(request, response, 200, responseJSON, type);
  } else {
    const responseJSON = {
      msg: 'Missing loggedIn param set to yes',
      id: 'unauthorized',
    };

    respond(request, response, 400, responseJSON, type);
  }
};
module.exports.unauthorized = unauthorized;

const badRequest = (request, response, params, type) => {
  if (params.valid && params.valid === "true") {
    const responseJSON = {
      msg: 'this request has the required params',
      id: 'badRequest',
    };

    respond(request, response, 200, responseJSON, type);
  } else {
    const responseJSON = {
      msg: 'Missing query param set to true',
      id: 'badRequest',
    };

    respond(request, response, 401, responseJSON, type);
  }
};
module.exports.badRequest = badRequest;

const notFound = (request, response, params, type) => {
  const responseJSON = {
    msg: 'The page was not found',
    id: 'notFound',
  };
  respond(request, response, 404, responseJSON, type);
};
module.exports.notFound = notFound;
