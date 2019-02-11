import 'babel-polyfill';
import express from 'express';
import pageRendering from './pageRendering';
import proxy from 'express-http-proxy';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import keys from '../../../config/keys';



const app = express();
app.use(cookieParser(keys.cookieKey));

app.use('/ajax', proxy('https://warm-brushlands-37235.herokuapp.com', {
    
    proxyReqOptDecorator(opts) {

        opts.headers['x-forwarded-host'] = 'localhost:3003';
        return opts;
    }
}));


app.use(bodyParser.json());
app.use(express.static('build'));

app.get(
	/^.+\.(ico)$/,
	(req, res) => {
		res.status(404).end();
	}
);

app.get("*", pageRendering);


const PORT = process.env.PORT || 3003;

app.listen(PORT);