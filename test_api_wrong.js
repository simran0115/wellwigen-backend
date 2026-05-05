import http from 'http';

const data = JSON.stringify({
  email: 'doctor@test.com',
  password: 'wrongpassword'
});

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/api/provider/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let output = '';
  res.on('data', d => {
    output += d;
  });
  res.on('end', () => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`Response: ${output}`);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
