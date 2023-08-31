// server.ts

import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import shortid from 'shortid';
import { errorHandler } from './middleware/errorHandler';
import { isValidUrl } from './middleware/validateUrl'; //
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8888;
app.use(bodyParser.json());
app.use(cors())


interface Record {
    url: string;
    createdOn: Date;
    clicked: number;
}
interface UrlDatabase {
  [shortcode: string]: Record;

}
// in memory DB for simulation purposes: Not for Production
const urlDatabase: UrlDatabase = {};

/**
 * For now keeping handlers as anonymous functiona later can be moved to independant file as this grows
 */
// Creating short url
app.post('/submit', isValidUrl, (req: Request, res: Response) => {
  const { url, shortcode } = req.body;

  if (!shortcode) {
    const newShortcode = shortid.generate();
    const newShortUrlRecord = <Record>{
        url,
        createdOn: new Date(),
        clicked: 0
    }
    urlDatabase[newShortcode] = newShortUrlRecord
    res.json({ shortcode: newShortcode, url: `${process.env.HOST_SHORTURL}/${newShortcode}` });
  } else {
    if (shortcode in urlDatabase) {
      res.json({});
    } else {
      urlDatabase[shortcode] = url;
      res.json({ shortcode });
    }
  }
});
// to get short url
app.get('/:shortcode', (req: Request, res: Response): void => {
  const { shortcode } = req.params;
  if (shortcode in urlDatabase) {
    let preClicks = urlDatabase[shortcode].clicked;
    // Updating clicks count in record
    urlDatabase[shortcode] = {
        ...urlDatabase[shortcode],
        clicked: ++preClicks
    }
    res.redirect(urlDatabase[shortcode].url);
  } else {
    res.status(404).send('Shortcode not found');
  }
});

app.get('/:shortcode/stats', (req: Request, res: Response): void => {
    const { shortcode } = req.params;
    if (shortcode in urlDatabase) {
      res.json(urlDatabase[shortcode]);
    } else {
      res.status(404).send('Shortcode not found');
    }
  });

app.get('*', (req:Request, res: Response): void => {
    res.status(404).json({
      error: {
        message: 'Route not found',
      },
    });
  });

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
