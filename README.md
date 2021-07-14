# node-arg
A python-like argparser for node.js

## Example
```javascript
const ArgumentParser = require('node-arg');

const parser = new ArgumentParser();
parser.add_argument('--port', { type: 'number', default: 8080 });
parser.add_argument('--env', { type: 'string', default: 'dev' });
parser.add_argument('--restart', { type: 'boolean', default: true });
parser.add_argument('--watch', { type: 'boolean', default: true });
parser.add_argument('--static-dir', { type: 'string', default: 'static' });

const args = parser.parse_args();
```

## Usage
### Command line
```node server.js --port 3000 --watch false```

### Expected result
```javascript
{
	port: 3000,
	env: 'dev',
	restart: true,
	watch: false,
	static_dir: 'static'
}
```